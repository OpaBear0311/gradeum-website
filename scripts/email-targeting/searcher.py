"""
Web search module.

Uses DuckDuckGo (no API key required) to find leadership pages,
staff directories, LinkedIn profiles, commission minutes, and news
for target organizations.
"""

from __future__ import annotations

import logging
import time
from dataclasses import dataclass

from duckduckgo_search import DDGS

logger = logging.getLogger(__name__)

# Rate-limit between searches to avoid getting blocked
_SEARCH_DELAY_S = 1.5


@dataclass
class SearchResult:
    title: str
    url: str
    snippet: str


def _search(query: str, max_results: int = 8) -> list[SearchResult]:
    """Run a DuckDuckGo text search and return results."""
    results: list[SearchResult] = []
    try:
        with DDGS() as ddgs:
            for r in ddgs.text(query, max_results=max_results):
                results.append(SearchResult(
                    title=r.get("title", ""),
                    url=r.get("href", ""),
                    snippet=r.get("body", ""),
                ))
    except Exception as exc:  # noqa: BLE001
        logger.warning("Search failed for %r: %s", query, exc)
    time.sleep(_SEARCH_DELAY_S)
    return results


def search_leadership_pages(org_name: str, domain: str = "") -> list[SearchResult]:
    """Find staff directory and leadership pages for an organization."""
    queries = [
        f'"{org_name}" leadership staff directory',
        f'"{org_name}" executive director chief engineer',
    ]
    if domain:
        queries.append(f"site:{domain} leadership OR staff OR team OR directory")

    all_results: list[SearchResult] = []
    seen_urls: set[str] = set()
    for q in queries:
        for r in _search(q, max_results=5):
            if r.url not in seen_urls:
                all_results.append(r)
                seen_urls.add(r.url)
    return all_results


def search_linkedin_profiles(org_name: str) -> list[SearchResult]:
    """Search for LinkedIn profiles of decision-makers at the org."""
    queries = [
        f'site:linkedin.com/in "{org_name}" director OR engineer OR manager',
        f'site:linkedin.com/in "{org_name}" executive director OR port director OR chief engineer',
    ]
    all_results: list[SearchResult] = []
    seen_urls: set[str] = set()
    for q in queries:
        for r in _search(q, max_results=5):
            if r.url not in seen_urls:
                all_results.append(r)
                seen_urls.add(r.url)
    return all_results


def search_commission_minutes(org_name: str, domain: str = "") -> list[SearchResult]:
    """Search for board/commission meeting minutes and agendas."""
    queries = [
        f'"{org_name}" board commission meeting minutes agenda',
    ]
    if domain:
        queries.append(f"site:{domain} minutes OR agenda OR meeting")
    return _dedupe([r for q in queries for r in _search(q, max_results=5)])


def search_warm_signals(org_name: str) -> list[SearchResult]:
    """Search for news, RFPs, grants, and capital plans."""
    queries = [
        f'"{org_name}" RFP OR procurement OR "request for proposal" 2025 OR 2026',
        f'"{org_name}" FEMA OR grant OR "capital improvement" OR CIP 2025 OR 2026',
        f'"{org_name}" hurricane OR storm damage OR infrastructure OR "asset management"',
    ]
    return _dedupe([r for q in queries for r in _search(q, max_results=5)])


def _dedupe(results: list[SearchResult]) -> list[SearchResult]:
    seen: set[str] = set()
    out: list[SearchResult] = []
    for r in results:
        if r.url not in seen:
            out.append(r)
            seen.add(r.url)
    return out
