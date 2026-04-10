# Gradeum Outreach Pipeline
# =========================
#
# Full pipeline orchestration:
#   source  → run the marketing agent to find new contacts
#   filter  → run the targeting pipeline to validate and classify
#   report  → generate the daily monitor report
#   draft   → generate adaptive email drafts
#   send    → dispatch emails (dry-run by default)
#   all     → run the full chain (source → filter → report → draft)
#
# Load environment variables from .env if it exists
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

PYTHON ?= python3
DATA_DIR := data

.PHONY: help install source filter report draft send send-live all clean

help:
	@echo "Gradeum Outreach Pipeline"
	@echo ""
	@echo "  make install      Install Python dependencies"
	@echo "  make source       Scrape web for new contacts (agent.py)"
	@echo "  make filter       Filter/validate sourced contacts (run.py)"
	@echo "  make report       Generate daily report (monitor.py)"
	@echo "  make draft        Generate email drafts (advertiser.py)"
	@echo "  make send         Dispatch drafts (DRY RUN — safe)"
	@echo "  make send-live    Dispatch drafts for real (requires confirmation)"
	@echo "  make all          Run source → filter → report → draft"
	@echo "  make clean        Remove generated data"
	@echo ""
	@echo "Typical daily workflow:"
	@echo "  make all          # sources, filters, reports, drafts"
	@echo "  make send         # preview what would go out"
	@echo "  make send-live    # actually send after review"

install:
	$(PYTHON) -m pip install -r requirements.txt

source:
	$(PYTHON) agent.py

source-tier1:
	$(PYTHON) agent.py --tier 1

source-tier2:
	$(PYTHON) agent.py --tier 2

filter:
	@if [ ! -f $(DATA_DIR)/sourced_contacts.csv ]; then \
		echo "ERROR: No sourced_contacts.csv. Run 'make source' first."; \
		exit 1; \
	fi
	$(PYTHON) run.py $(DATA_DIR)/sourced_contacts.csv \
		--prior-sends $(DATA_DIR)/sent_log.csv

report:
	$(PYTHON) monitor.py

report-watch:
	$(PYTHON) monitor.py --watch --interval 3600

draft:
	@if [ ! -f $(DATA_DIR)/send_queue.csv ]; then \
		echo "ERROR: No send_queue.csv. Run 'make filter' first."; \
		exit 1; \
	fi
	$(PYTHON) advertiser.py

send:
	$(PYTHON) send.py

send-live:
	$(PYTHON) send.py --send --limit 5 --rate 15

all: source filter report draft
	@echo ""
	@echo "Full pipeline complete."
	@echo "Review drafts in $(DATA_DIR)/email_drafts.csv"
	@echo "Then run 'make send' (dry) or 'make send-live' (actually sends)."

clean:
	@echo "Removing generated data files ..."
	rm -f $(DATA_DIR)/send_queue.csv
	rm -f $(DATA_DIR)/review.csv
	rm -f $(DATA_DIR)/sourced_contacts.csv
	rm -f $(DATA_DIR)/agent_log.csv
	rm -f $(DATA_DIR)/email_drafts.csv
	rm -f $(DATA_DIR)/dry_run_outbox.txt
	rm -rf $(DATA_DIR)/reports
	@echo "Note: sent_log.csv and template_performance.json preserved."
	@echo "      Remove manually if you want to reset tracking."
