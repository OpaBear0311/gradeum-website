"""
Configuration for email targeting pipeline.
Target roles, excluded patterns, org tiers, and warm signal keywords.
"""

# ---------------------------------------------------------------------------
# Section 1 – Target role keywords (case-insensitive substring match)
# Any contact whose title contains one of these fragments is considered valid.
# ---------------------------------------------------------------------------
TARGET_ROLE_KEYWORDS: list[str] = [
    # Executive / port leadership
    "executive director",
    "port director",
    "chief executive",
    "ceo",
    "general manager",
    "deputy director",
    "assistant director",
    # Engineering
    "director of engineering",
    "chief engineer",
    "port engineer",
    "senior engineer",
    "city engineer",
    "county engineer",
    "engineer",
    "engineering manager",
    "director of maintenance",
    "maintenance director",
    # Operations
    "director of operations",
    "operations manager",
    "operations director",
    "chief operating",
    "coo",
    # Asset / facilities
    "asset management",
    "asset manager",
    "facilities manager",
    "facilities director",
    "maintenance manager",
    # Capital / infrastructure
    "capital projects",
    "infrastructure manager",
    "infrastructure director",
    "project manager",
    "capital improvement",
    # Technology
    "cto",
    "chief technology",
    "it director",
    "director of it",
    "director of information technology",
    "information technology director",
    # Board / commission (small ports)
    "commissioner",
    "board member",
    "board chair",
    "chairman",
    "chairwoman",
    "vice chair",
    # Generic director+ catch-all
    "vice president",
    "vp ",
    "svp ",
    "president",
    "director",
]

# ---------------------------------------------------------------------------
# Section 2 – Rejected email prefixes (exact match on the local part)
# ---------------------------------------------------------------------------
REJECTED_PREFIXES: set[str] = {
    "hr",
    "careers",
    "jobs",
    "portjobs",
    "info",
    "media",
    "communications",
    "publicrelations",
    "security",
    "records",
    "support",
    "cruises",
    "connect",
    "public.records",
}

# Placeholder / example addresses to always reject
REJECTED_FULL_EMAILS: set[str] = {
    "name@email.com",
    "example@domain.com",
}

# Patterns that indicate a department inbox rather than a person.
# If the local part matches one of these regex patterns, reject it.
# These catch things like "accounting@", "billing@", "admin@", etc.
DEPARTMENT_INBOX_KEYWORDS: list[str] = [
    "accounting",
    "accounts",
    "admin",
    "billing",
    "board",
    "clerk",
    "compliance",
    "contact",
    "customerservice",
    "dispatch",
    "engineering",
    "environment",
    "events",
    "facilities",
    "finance",
    "general",
    "helpdesk",
    "legal",
    "logistics",
    "mail",
    "marketing",
    "news",
    "office",
    "operations",
    "payroll",
    "permits",
    "planning",
    "procurement",
    "purchasing",
    "reception",
    "safety",
    "sales",
    "shipping",
    "webmaster",
]

# ---------------------------------------------------------------------------
# Section 3 – Organization tiers
# Manual tier lookup.  Key = lowercased org name, value = tier string.
# Extend this dict as new orgs are identified.
# ---------------------------------------------------------------------------
ORG_TIER_MAP: dict[str, str] = {
    # Tier 1 — Major ports, 100+ staff
    "port of corpus christi": "1",
    "port corpus christi": "1",
    "jaxport": "1",
    "port of jacksonville": "1",
    "port of houston": "1",
    "port houston": "1",
    "port of new orleans": "1",
    "port nola": "1",
    "port of beaumont": "1",
    "port of gulfport": "1",
    "port of mobile": "1",
    "alabama state port authority": "1",
    "port of pensacola": "1",
    "port of tampa bay": "1",
    "tampa port authority": "1",
    "port of galveston": "1",
    "port of long beach": "1",
    "port of los angeles": "1",
    "port of savannah": "1",
    "georgia ports authority": "1",
    "south carolina ports authority": "1",
    "port of charleston": "1",
    "port of virginia": "1",
    # Tier 2 — Mid-size ports, 20-100 staff
    "port of lake charles": "2",
    "port of brownsville": "2",
    "port of freeport": "2",
    "port freeport": "2",
    "port of orange": "2",
    "port of port arthur": "2",
    "port of victoria": "2",
    "port of pascagoula": "2",
    "port of biloxi": "2",
    "port of panama city": "2",
    "port of manatee": "2",
    "port manatee": "2",
    "port of palm beach": "2",
    "port of fort pierce": "2",
    "canaveral port authority": "2",
    "port canaveral": "2",
    "port of iberia": "2",
    "port of south louisiana": "2",
    "plaquemines port": "2",
    "port of plaquemines": "2",
    "saint bernard port": "2",
    # Tier 3 — Small ports / authorities, <20 staff
    "port of harlingen": "3",
    "calhoun port authority": "3",
    "port of port lavaca": "3",
    "port of west calhoun": "3",
    "port of palacios": "3",
    "port of port mansfield": "3",
    "port of rockport": "3",
    "port of aransas": "3",
    "port of east cameron": "3",
    "port of delcambre": "3",
    "port of west st. mary": "3",
    "port of morgan city": "3",
    "port of ray": "3",
    "port of bayou lafourche": "3",
    # Municipal — City / county with waterfront assets
    "city of biloxi": "Municipal",
    "city of mobile": "Municipal",
    "city of gulfport": "Municipal",
    "city of galveston": "Municipal",
    "city of port arthur": "Municipal",
    "city of corpus christi": "Municipal",
    "city of brownsville": "Municipal",
    "city of pensacola": "Municipal",
    "city of tampa": "Municipal",
    "city of jacksonville": "Municipal",
    "city of new orleans": "Municipal",
    "city of savannah": "Municipal",
    "city of charleston": "Municipal",
}

# Default tier when org is not in the lookup
DEFAULT_TIER = "Unclassified"

# ---------------------------------------------------------------------------
# Section 5 – Contact role classification
# If title matches any of these, classify as "technical"; otherwise "executive"
# ---------------------------------------------------------------------------
TECHNICAL_ROLE_KEYWORDS: list[str] = [
    "engineer",
    "engineering",
    "maintenance",
    "asset management",
    "asset manager",
    "facilities",
    "operations manager",
    "operations director",
    "director of operations",
    "capital projects",
    "infrastructure",
    "project manager",
    "it director",
    "director of it",
    "cto",
    "chief technology",
    "information technology",
]

# ---------------------------------------------------------------------------
# Section 6 – Warm signal keywords
# Scanned against org notes, news, or meeting minutes text.
# ---------------------------------------------------------------------------
WARM_SIGNAL_KEYWORDS: list[str] = [
    "rfp",
    "request for proposal",
    "request for qualifications",
    "rfq",
    "procurement notice",
    "fema grant",
    "fema funding",
    "disaster recovery",
    "hazard mitigation",
    "capital improvement plan",
    "capital improvement program",
    "cip",
    "storm damage",
    "hurricane damage",
    "hurricane",
    "tropical storm",
    "infrastructure failure",
    "asset management",
    "inspection backlog",
    "deferred maintenance",
    "consultant contract",
    "contract expiring",
    "contract renewal",
    "bond issue",
    "infrastructure assessment",
]

# ---------------------------------------------------------------------------
# Section 8 – Per-org send limit
# ---------------------------------------------------------------------------
MAX_CONTACTS_PER_ORG = 2

# ---------------------------------------------------------------------------
# Email verification API (optional — set env vars to enable)
# Supports ZeroBounce and NeverBounce.  Leave blank to skip.
# ---------------------------------------------------------------------------
ZEROBOUNCE_API_KEY_ENV = "ZEROBOUNCE_API_KEY"
NEVERBOUNCE_API_KEY_ENV = "NEVERBOUNCE_API_KEY"
