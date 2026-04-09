"""
Target organizations database.

Each org has a name, known/likely website domain, tier, and optional
search hints (e.g. known staff-directory URL paths).
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class TargetOrg:
    name: str
    tier: str
    domain: str = ""
    aliases: list[str] = field(default_factory=list)
    staff_paths: list[str] = field(default_factory=list)
    notes: str = ""


# ── Gulf Coast & Southeast Ports ─────────────────────────────────────────────

ORGS: list[TargetOrg] = [
    # ── Tier 1 — Major ports, 100+ staff ─────────────────────────────────
    TargetOrg(
        name="Port of Corpus Christi",
        tier="1",
        domain="portofcc.com",
        aliases=["Port Corpus Christi", "Port of Corpus Christi Authority"],
        staff_paths=["/about-us/leadership", "/about/leadership", "/leadership"],
    ),
    TargetOrg(
        name="JAXPORT",
        tier="1",
        domain="jaxport.com",
        aliases=["Port of Jacksonville", "Jacksonville Port Authority"],
        staff_paths=["/about/leadership", "/leadership", "/corporate/leadership"],
    ),
    TargetOrg(
        name="Port Houston",
        tier="1",
        domain="porthouston.com",
        aliases=["Port of Houston", "Port of Houston Authority"],
        staff_paths=["/about-us/leadership", "/about/leadership-team"],
    ),
    TargetOrg(
        name="Port of New Orleans",
        tier="1",
        domain="portnola.com",
        aliases=["Port NOLA", "Board of Commissioners of the Port of New Orleans"],
        staff_paths=["/about/leadership", "/about-us/leadership"],
    ),
    TargetOrg(
        name="Port of Beaumont",
        tier="1",
        domain="portofbeaumont.com",
        aliases=["Beaumont Port"],
        staff_paths=["/about/staff", "/about/leadership"],
    ),
    TargetOrg(
        name="Port of Gulfport",
        tier="1",
        domain="mississippiports.com",
        aliases=["Mississippi State Port Authority", "MS State Port Authority"],
        staff_paths=["/about/leadership", "/about-us/staff"],
    ),
    TargetOrg(
        name="Alabama State Port Authority",
        tier="1",
        domain="asdd.com",
        aliases=["Port of Mobile", "ASPA"],
        staff_paths=["/about/leadership", "/about-us/team"],
    ),
    TargetOrg(
        name="Port of Pensacola",
        tier="1",
        domain="portofpensacola.com",
        aliases=["Pensacola Port"],
        staff_paths=["/about/staff", "/about/leadership"],
    ),
    TargetOrg(
        name="Port Tampa Bay",
        tier="1",
        domain="porttb.com",
        aliases=["Port of Tampa Bay", "Tampa Port Authority"],
        staff_paths=["/about/leadership", "/about-us/leadership-team"],
    ),
    TargetOrg(
        name="Port of Galveston",
        tier="1",
        domain="portofgalveston.com",
        aliases=["Galveston Wharves"],
        staff_paths=["/about/leadership", "/about-us/staff"],
    ),
    TargetOrg(
        name="Georgia Ports Authority",
        tier="1",
        domain="gaports.com",
        aliases=["Port of Savannah", "GPA"],
        staff_paths=["/about/leadership", "/about-gpa/leadership"],
    ),
    TargetOrg(
        name="South Carolina Ports Authority",
        tier="1",
        domain="scspa.com",
        aliases=["Port of Charleston", "SC Ports"],
        staff_paths=["/about/leadership", "/about/executive-team"],
    ),
    TargetOrg(
        name="Virginia Port Authority",
        tier="1",
        domain="portofvirginia.com",
        aliases=["Port of Virginia", "VPA"],
        staff_paths=["/about/leadership", "/about-us/leadership"],
    ),

    # ── Tier 2 — Mid-size ports, 20-100 staff ────────────────────────────
    TargetOrg(
        name="Port of Lake Charles",
        tier="2",
        domain="portlc.com",
        aliases=["Lake Charles Harbor and Terminal District"],
        staff_paths=["/about/staff", "/about/leadership", "/staff"],
    ),
    TargetOrg(
        name="Port of Brownsville",
        tier="2",
        domain="portofbrownsville.com",
        aliases=["Brownsville Navigation District"],
        staff_paths=["/about/leadership", "/about-us/staff"],
    ),
    TargetOrg(
        name="Port Freeport",
        tier="2",
        domain="portfreeport.com",
        aliases=["Port of Freeport"],
        staff_paths=["/about/leadership", "/about/staff", "/about-us/leadership"],
    ),
    TargetOrg(
        name="Port of Orange",
        tier="2",
        domain="portoforange.com",
        aliases=["Orange County Navigation and Port District"],
        staff_paths=["/about/staff", "/leadership"],
    ),
    TargetOrg(
        name="Port of Port Arthur",
        tier="2",
        domain="portofportarthur.com",
        aliases=["Port Arthur Navigation District"],
        staff_paths=["/about/leadership", "/about/staff"],
    ),
    TargetOrg(
        name="Port of Victoria",
        tier="2",
        domain="portofvictoria.com",
        aliases=["Victoria County Navigation District"],
        staff_paths=["/about/staff", "/about/leadership"],
    ),
    TargetOrg(
        name="Port of Pascagoula",
        tier="2",
        domain="portofpascagoula.com",
        aliases=["Jackson County Port Authority"],
        staff_paths=["/about/leadership", "/about/staff"],
    ),
    TargetOrg(
        name="Port of Panama City",
        tier="2",
        domain="portpanamacityusa.com",
        aliases=["Panama City Port Authority"],
        staff_paths=["/about/leadership", "/about-us/staff"],
    ),
    TargetOrg(
        name="Port Manatee",
        tier="2",
        domain="portmanatee.com",
        aliases=["Port of Manatee", "Manatee County Port Authority"],
        staff_paths=["/about/leadership", "/about/staff"],
    ),
    TargetOrg(
        name="Port of Palm Beach",
        tier="2",
        domain="portofpalmbeach.com",
        aliases=["Palm Beach Port"],
        staff_paths=["/about/leadership", "/about/staff"],
    ),
    TargetOrg(
        name="Canaveral Port Authority",
        tier="2",
        domain="portcanaveral.com",
        aliases=["Port Canaveral"],
        staff_paths=["/about/leadership", "/authority/leadership"],
    ),
    TargetOrg(
        name="Port of South Louisiana",
        tier="2",
        domain="portsl.com",
        aliases=["South Louisiana Port"],
        staff_paths=["/about/leadership", "/about/staff"],
    ),
    TargetOrg(
        name="Plaquemines Port Harbor and Terminal District",
        tier="2",
        domain="plaqueminesport.com",
        aliases=["Plaquemines Port", "Port of Plaquemines"],
        staff_paths=["/about/leadership", "/about/staff"],
    ),
    TargetOrg(
        name="Port of Iberia",
        tier="2",
        domain="portofiberia.com",
        aliases=["Port of Iberia District"],
        staff_paths=["/about/leadership", "/about/staff"],
    ),
    TargetOrg(
        name="Saint Bernard Port Harbor and Terminal District",
        tier="2",
        domain="sbport.com",
        aliases=["Saint Bernard Port", "St. Bernard Port"],
        staff_paths=["/about/staff", "/about/leadership"],
    ),

    # ── Tier 3 — Small ports / authorities, <20 staff ────────────────────
    TargetOrg(
        name="Port of Harlingen",
        tier="3",
        domain="portofharlingen.com",
        aliases=["Harlingen Navigation District"],
        staff_paths=["/about", "/about/staff", "/contact"],
    ),
    TargetOrg(
        name="Calhoun Port Authority",
        tier="3",
        domain="calhounport.com",
        aliases=["Port of Port Lavaca", "Port of West Calhoun"],
        staff_paths=["/about", "/about/staff"],
    ),
    TargetOrg(
        name="Port of Palacios",
        tier="3",
        domain="portofpalacios.com",
        aliases=["Palacios Port"],
        staff_paths=["/about", "/contact"],
    ),
    TargetOrg(
        name="Port of Port Mansfield",
        tier="3",
        domain="portmansfield.com",
        aliases=["Willacy County Navigation District"],
        staff_paths=["/about", "/contact"],
    ),
    TargetOrg(
        name="Port of Morgan City",
        tier="3",
        domain="portofmorgancity.com",
        aliases=["Morgan City Port"],
        staff_paths=["/about", "/about/staff"],
    ),
    TargetOrg(
        name="Port of Delcambre",
        tier="3",
        domain="portofdelcambre.com",
        aliases=["Delcambre Port"],
        staff_paths=["/about", "/contact"],
    ),
    TargetOrg(
        name="Port of West St. Mary",
        tier="3",
        domain="portofweststmary.com",
        aliases=["West St. Mary Port"],
        staff_paths=["/about", "/contact"],
    ),
    TargetOrg(
        name="Greater Lafourche Port Commission",
        tier="3",
        domain="portfourchon.com",
        aliases=["Port of Bayou Lafourche", "Port Fourchon"],
        staff_paths=["/about/leadership", "/about/staff"],
    ),
    TargetOrg(
        name="Port of Rockport",
        tier="3",
        domain="portofrockport.com",
        aliases=["Aransas County Navigation District"],
        staff_paths=["/about", "/contact"],
    ),
    TargetOrg(
        name="Port of East Cameron",
        tier="3",
        domain="portofeastcameron.com",
        aliases=["East Cameron Port"],
        staff_paths=["/about", "/contact"],
    ),

    # ── Municipal — City/county with waterfront assets ────────────────────
    TargetOrg(
        name="City of Biloxi",
        tier="Municipal",
        domain="biloxi.ms.us",
        aliases=["Biloxi, Mississippi"],
        staff_paths=["/departments/engineering", "/government/departments", "/city-directory"],
    ),
    TargetOrg(
        name="City of Mobile",
        tier="Municipal",
        domain="cityofmobile.org",
        aliases=["Mobile, Alabama"],
        staff_paths=["/departments", "/government/departments", "/city-directory"],
    ),
    TargetOrg(
        name="City of Gulfport",
        tier="Municipal",
        domain="gulfport-ms.gov",
        aliases=["Gulfport, Mississippi"],
        staff_paths=["/departments", "/government/departments"],
    ),
    TargetOrg(
        name="City of Galveston",
        tier="Municipal",
        domain="galvestontx.gov",
        aliases=["Galveston, Texas"],
        staff_paths=["/government/departments", "/city-directory"],
    ),
    TargetOrg(
        name="City of Port Arthur",
        tier="Municipal",
        domain="portarthurtx.gov",
        aliases=["Port Arthur, Texas"],
        staff_paths=["/departments", "/government/departments"],
    ),
    TargetOrg(
        name="City of Corpus Christi",
        tier="Municipal",
        domain="cctexas.com",
        aliases=["Corpus Christi, Texas"],
        staff_paths=["/departments", "/government/city-directory"],
    ),
    TargetOrg(
        name="City of Brownsville",
        tier="Municipal",
        domain="brownsvilletx.gov",
        aliases=["Brownsville, Texas"],
        staff_paths=["/departments", "/government/departments"],
    ),
    TargetOrg(
        name="City of Pensacola",
        tier="Municipal",
        domain="cityofpensacola.com",
        aliases=["Pensacola, Florida"],
        staff_paths=["/departments", "/government/staff-directory"],
    ),
    TargetOrg(
        name="City of Tampa",
        tier="Municipal",
        domain="tampa.gov",
        aliases=["Tampa, Florida"],
        staff_paths=["/departments", "/government/city-directory"],
    ),
    TargetOrg(
        name="City of Jacksonville",
        tier="Municipal",
        domain="coj.net",
        aliases=["Jacksonville, Florida"],
        staff_paths=["/departments", "/departments/public-works"],
    ),
    TargetOrg(
        name="City of New Orleans",
        tier="Municipal",
        domain="nola.gov",
        aliases=["New Orleans, Louisiana"],
        staff_paths=["/government/departments", "/city-directory"],
    ),
    TargetOrg(
        name="City of Savannah",
        tier="Municipal",
        domain="savannahga.gov",
        aliases=["Savannah, Georgia"],
        staff_paths=["/departments", "/city-directory"],
    ),
    TargetOrg(
        name="City of Charleston",
        tier="Municipal",
        domain="charleston-sc.gov",
        aliases=["Charleston, South Carolina"],
        staff_paths=["/departments", "/government/departments"],
    ),
]
