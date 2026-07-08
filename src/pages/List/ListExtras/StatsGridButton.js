import React from "react";
import { useReactToPrint } from "react-to-print";
import { Chip, Menu, MenuItem } from "@material-ui/core";
import { GridOn as GridIcon } from "@material-ui/icons";
import cards from "constants/cards";
import keywords from "constants/keywords";
import urls from "constants/urls";
import cardText from "constants/cardText.json";

const DEFENSE_LABEL = { r: "Red", w: "White" };
const SURGE_LABEL = { c: "Crit", h: "Hit", b: "Block", "": "—" };

function rangePart(v) {
  return v === null || v === undefined ? "Mêlée" : String(v);
}

function formatRange(range) {
  if (!range || range.length === 0) return "—";
  if (range.length === 1) return rangePart(range[0]);
  return `${rangePart(range[0])}-${rangePart(range[range.length - 1])}`;
}

function formatDice(dice) {
  if (!dice) return "—";
  const parts = [];
  if (dice.r) parts.push(`${dice.r}R`);
  if (dice.b) parts.push(`${dice.b}B`);
  if (dice.w) parts.push(`${dice.w}W`);
  return parts.length ? parts.join(" ") : "—";
}

function keywordName(k) {
  return typeof k === "string" ? k : k?.name;
}

function formatKeywords(kws) {
  if (!kws || kws.length === 0) return "";
  return kws
    .map((k) => (typeof k === "string" ? k : `${k.name} ${k.value}`))
    .join(", ");
}

function collectListKeywordNames(currentList) {
  const names = new Set();
  const addAll = (kws) => {
    (kws || []).forEach((k) => {
      const n = keywordName(k);
      if (n) names.add(n);
    });
  };
  const addUnit = (unit) => {
    const card = cards[unit.unitId];
    if (!card) return;
    addAll(card.keywords);
    (card.weapons || []).forEach((w) => addAll(w.keywords));
    (unit.upgradesEquipped || []).filter(Boolean).forEach((id) => {
      const up = cards[id];
      if (!up) return;
      addAll(up.keywords);
      (up.weapons || []).forEach((w) => addAll(w.keywords));
    });
  };
  (currentList.units || []).forEach((unit) => {
    addUnit(unit);
    if (unit.counterpart) {
      addUnit({
        unitId: unit.counterpart.counterpartId,
        upgradesEquipped: unit.counterpart.upgradesEquipped,
      });
    }
  });
  return Array.from(names).sort((a, b) => a.localeCompare(b));
}

const cellStyle = {
  border: "1px solid #444",
  padding: "2px 4px",
  fontSize: 11,
  textAlign: "left",
  verticalAlign: "top",
};

const headerCellStyle = {
  ...cellStyle,
  background: "#eee",
  fontWeight: "bold",
  textAlign: "center",
};

function UnitBlock({ unit, instanceLabel }) {
  const card = cards[unit.unitId];
  if (!card) return null;
  const stats = card.stats || {};

  const equippedUpgrades = (unit.upgradesEquipped || [])
    .filter(Boolean)
    .map((id) => cards[id])
    .filter(Boolean);

  const baseWeapons = (card.weapons || []).map((w) => ({ ...w, source: null }));
  const upgradeWeapons = equippedUpgrades.flatMap((up) =>
    (up.weapons || []).map((w) => ({ ...w, source: up.cardName }))
  );
  const weapons = [...baseWeapons, ...upgradeWeapons];

  const upgradeNames = equippedUpgrades.map((up) => up.cardName);
  const upgradeKeywords = equippedUpgrades.flatMap((up) => up.keywords || []);

  return (
    <div
      style={{
        border: "2px solid #000",
        borderRadius: 4,
        padding: 6,
        marginBottom: 6,
        breakInside: "avoid",
        pageBreakInside: "avoid",
        background: "white",
        color: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 4,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: "bold" }}>
          {card.cardName}
          {card.title ? ` — ${card.title}` : ""}
          {instanceLabel ? ` ${instanceLabel}` : ""}
        </div>
        <div style={{ fontSize: 11 }}>
          {card.rank ? `${card.rank.toUpperCase()} · ` : ""}
          {unit.totalUnitCost ?? card.cost ?? ""} pts
        </div>
      </div>

      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginBottom: 4,
        }}
      >
        <thead>
          <tr>
            <th style={headerCellStyle}>Mini</th>
            <th style={headerCellStyle}>HP</th>
            <th style={headerCellStyle}>Def</th>
            <th style={headerCellStyle}>Cor</th>
            <th style={headerCellStyle}>Spd</th>
            <th style={headerCellStyle}>Hit Surge</th>
            <th style={headerCellStyle}>Def Surge</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...cellStyle, textAlign: "center" }}>
              {stats.minicount ?? "—"}
            </td>
            <td style={{ ...cellStyle, textAlign: "center" }}>
              {stats.hp ?? "—"}
            </td>
            <td style={{ ...cellStyle, textAlign: "center" }}>
              {DEFENSE_LABEL[stats.defense] || stats.defense || "—"}
            </td>
            <td style={{ ...cellStyle, textAlign: "center" }}>
              {stats.courage ?? "—"}
            </td>
            <td style={{ ...cellStyle, textAlign: "center" }}>
              {stats.speed ?? "—"}
            </td>
            <td style={{ ...cellStyle, textAlign: "center" }}>
              {SURGE_LABEL[stats.hitsurge] ?? stats.hitsurge ?? "—"}
            </td>
            <td style={{ ...cellStyle, textAlign: "center" }}>
              {SURGE_LABEL[stats.defsurge] ?? stats.defsurge ?? "—"}
            </td>
          </tr>
        </tbody>
      </table>

      {weapons.length > 0 && (
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            marginBottom: 4,
          }}
        >
          <thead>
            <tr>
              <th style={headerCellStyle}>Weapon</th>
              <th style={headerCellStyle}>Range</th>
              <th style={headerCellStyle}>Dice</th>
              <th style={headerCellStyle}>Keywords</th>
            </tr>
          </thead>
          <tbody>
            {weapons.map((w, i) => (
              <tr key={i}>
                <td style={cellStyle}>
                  {w.name}
                  {w.source ? (
                    <span style={{ fontStyle: "italic", color: "#555" }}>
                      {" "}
                      (from {w.source})
                    </span>
                  ) : null}
                </td>
                <td style={{ ...cellStyle, textAlign: "center" }}>
                  {formatRange(w.range)}
                </td>
                <td style={{ ...cellStyle, textAlign: "center" }}>
                  {formatDice(w.dice)}
                </td>
                <td style={cellStyle}>{formatKeywords(w.keywords)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {card.keywords && card.keywords.length > 0 && (
        <div style={{ fontSize: 11, marginBottom: 2 }}>
          <b>Keywords:</b> {formatKeywords(card.keywords)}
        </div>
      )}

      {upgradeKeywords.length > 0 && (
        <div style={{ fontSize: 11, marginBottom: 2 }}>
          <b>From upgrades:</b> {formatKeywords(upgradeKeywords)}
        </div>
      )}

      {upgradeNames.length > 0 && (
        <div style={{ fontSize: 11 }}>
          <b>Upgrades:</b> {upgradeNames.join(", ")}
        </div>
      )}
    </div>
  );
}

const INK_FILTERS = {
  color: "none",
  saver: "grayscale(1) contrast(0.55) brightness(1.35)",
};

const PAGE_W = "7.5in";
const PAGE_H = "10in";

function PageHeader({ title }) {
  if (!title) return null;
  return (
    <div
      style={{
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        borderBottom: "1px solid #000",
        paddingBottom: 2,
        marginBottom: 4,
        color: "black",
        textTransform: "uppercase",
        letterSpacing: 1,
      }}
    >
      {title}
    </div>
  );
}

function CardPage({ ids, cols, rows, inkMode, title }) {
  const items = (ids || [])
    .filter(Boolean)
    .map((id) => cards[id])
    .filter(Boolean);
  if (items.length === 0) return null;
  return (
    <div
      style={{
        pageBreakBefore: "always",
        breakBefore: "page",
        width: PAGE_W,
        height: PAGE_H,
        display: "flex",
        flexFlow: "column",
      }}
    >
      <PageHeader title={title} />
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: "0.05in",
        }}
      >
        {items.map((c, i) => (
        <div
          key={`${c.id}-${i}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            alt={c.cardName}
            src={`${urls.cdn}/${c.cardType}Cards/${c.imageName}`}
            loading="eager"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              filter: INK_FILTERS[inkMode] || "none",
              WebkitPrintColorAdjust: "exact",
              printColorAdjust: "exact",
            }}
          />
        </div>
      ))}
      </div>
    </div>
  );
}

function CardTextBlock({ id, fallbackCard }) {
  const ct = cardText[id];
  const card = fallbackCard || cards[id];
  const name = ct?.name || card?.cardName || id;

  // If we have no OCR'd text for this card, fall back to a name-only stub
  // so the printout doesn't silently drop the card.
  if (!ct) {
    return (
      <div
        style={{
          border: "1px solid #999",
          borderRadius: 4,
          padding: 8,
          fontSize: 11,
          background: "#fafafa",
          color: "#333",
          breakInside: "avoid",
          pageBreakInside: "avoid",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: 13 }}>{name}</div>
        <div style={{ fontStyle: "italic", color: "#888" }}>
          (no card text available)
        </div>
      </div>
    );
  }

  const restrictionParts = [];
  if (ct.factionRestriction && ct.factionRestriction !== "none") {
    restrictionParts.push(ct.factionRestriction);
  }
  if (
    ct.commanderRestriction &&
    ct.commanderRestriction !== "none" &&
    ct.commanderRestriction !== ct.factionRestriction
  ) {
    restrictionParts.push(ct.commanderRestriction);
  }

  return (
    <div
      style={{
        border: "1px solid #444",
        borderRadius: 4,
        padding: 6,
        fontSize: 10.5,
        lineHeight: 1.3,
        color: "black",
        background: "white",
        breakInside: "avoid",
        pageBreakInside: "avoid",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 3,
          gap: 6,
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: 12 }}>
          {name}
          {(() => {
            const pips = ct.pips || card?.cardSubtype;
            if (!pips) return null;
            const countsAs = ct.countsAsPips || pips;
            const label =
              String(pips) === String(countsAs)
                ? `(${pips}-pip)`
                : `(${pips}-pip slot, counts as ${countsAs})`;
            return (
              <span style={{ color: "#666", fontWeight: "normal" }}>
                {" "}
                {label}
              </span>
            );
          })()}
        </div>
        {restrictionParts.length > 0 && (
          <div style={{ fontSize: 9, color: "#555", textAlign: "right" }}>
            {restrictionParts.join(" · ")}
          </div>
        )}
      </div>

      {(() => {
        const banner =
          ct.orders ||
          (ct.commanderRestriction && ct.commanderRestriction !== "none"
            ? ct.commanderRestriction
            : "");
        if (!banner) return null;
        return (
          <div
            style={{
              background: "#222",
              color: "white",
              padding: "1px 6px",
              fontSize: 10,
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: 4,
              letterSpacing: 0.5,
              textAlign: "center",
            }}
          >
            {banner}
          </div>
        );
      })()}

      {ct.text && (
        <div style={{ whiteSpace: "pre-wrap", marginBottom: ct.flavor ? 3 : 0 }}>
          {ct.text}
        </div>
      )}

      {ct.weapon && (
        <div
          style={{
            marginTop: 4,
            padding: 3,
            border: "1px solid #888",
            background: "#f5f5f5",
            fontSize: 10,
          }}
        >
          <b>{ct.weapon.name}</b>
          {ct.weapon.range !== undefined ? ` · Range ${ct.weapon.range}` : ""}
          {ct.weapon.dice ? ` · ${ct.weapon.dice}` : ""}
          {ct.weapon.keywords ? <div>{ct.weapon.keywords}</div> : null}
        </div>
      )}

      {ct.flavor && (
        <div style={{ fontStyle: "italic", color: "#555", fontSize: 10 }}>
          {ct.flavor}
        </div>
      )}
    </div>
  );
}

function CardTextPage({ ids, cols = 2, title }) {
  const validIds = (ids || []).filter(Boolean);
  if (validIds.length === 0) return null;
  return (
    <div
      style={{
        pageBreakBefore: "always",
        breakBefore: "page",
        width: PAGE_W,
        padding: "0.1in",
      }}
    >
      <PageHeader title={title} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "0.1in",
        }}
      >
        {validIds.map((id, i) => (
          <CardTextBlock key={`${id}-${i}`} id={id} />
        ))}
      </div>
    </div>
  );
}

function CardSelections({ currentList, inkMode }) {
  const commandIds = currentList.commandCards || [];
  const primaryIds = currentList.primaryCards || [];
  const secondaryIds = currentList.secondaryCards || [];
  const advantageIds = currentList.advantageCards || [];
  const hasAny =
    commandIds.length + primaryIds.length + secondaryIds.length + advantageIds.length > 0;
  if (!hasAny) return null;

  if (inkMode === "text") {
    // Text mode: text pages for commands + secondary + advantage.
    // Primary objectives keep their image grid because they have diagrams.
    return (
      <>
        {commandIds.length > 0 && (
          <CardTextPage ids={commandIds} cols={2} title="Command Cards" />
        )}
        {primaryIds.length > 0 && (
          <CardPage
            ids={primaryIds}
            cols={2}
            rows={2}
            inkMode="color"
            title="Primary Objectives"
          />
        )}
        {secondaryIds.length > 0 && (
          <CardTextPage
            ids={secondaryIds}
            cols={2}
            title="Secondary Objectives"
          />
        )}
        {advantageIds.length > 0 && (
          <CardTextPage
            ids={advantageIds}
            cols={2}
            title="Advantage Cards"
          />
        )}
      </>
    );
  }

  // Image modes (color / ink-saver): one labeled page per category.
  return (
    <>
      {commandIds.length > 0 && (
        <CardPage
          ids={commandIds}
          cols={3}
          rows={2}
          inkMode={inkMode}
          title="Command Cards"
        />
      )}
      {primaryIds.length > 0 && (
        <CardPage
          ids={primaryIds}
          cols={2}
          rows={2}
          inkMode={inkMode}
          title="Primary Objectives"
        />
      )}
      {secondaryIds.length > 0 && (
        <CardPage
          ids={secondaryIds}
          cols={3}
          rows={1}
          inkMode={inkMode}
          title="Secondary Objectives"
        />
      )}
      {advantageIds.length > 0 && (
        <CardPage
          ids={advantageIds}
          cols={2}
          rows={1}
          inkMode={inkMode}
          title="Advantage Cards"
        />
      )}
    </>
  );
}

function KeywordGlossary({ currentList }) {
  const names = collectListKeywordNames(currentList);
  const entries = names
    .map((name) => ({ name, text: keywords[name] }))
    .filter((e) => e.text);
  if (entries.length === 0) return null;
  return (
    <div
      style={{
        marginTop: 10,
        breakInside: "avoid",
        pageBreakInside: "avoid",
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: "bold",
          borderBottom: "1px solid #000",
          marginBottom: 4,
          paddingBottom: 2,
        }}
      >
        Keyword Glossary
      </div>
      <div
        style={{
          columnCount: 2,
          columnGap: 12,
          fontSize: 10,
        }}
      >
        {entries.map((e) => (
          <div
            key={e.name}
            style={{
              breakInside: "avoid",
              pageBreakInside: "avoid",
              marginBottom: 4,
            }}
          >
            <b>{e.name}.</b> {e.text.replace(/\s+/g, " ")}
          </div>
        ))}
      </div>
    </div>
  );
}

const StatsGridSheet = React.forwardRef(({ currentList, inkMode }, ref) => {
  const blocks = [];
  (currentList.units || []).forEach((unit, i) => {
    const count = unit.count || 1;
    for (let n = 0; n < count; n++) {
      blocks.push(
        <UnitBlock
          key={`${i}-${n}`}
          unit={unit}
          instanceLabel={count > 1 ? `(#${n + 1})` : ""}
        />
      );
    }
    if (unit.counterpart) {
      blocks.push(
        <UnitBlock
          key={`${i}-cp`}
          unit={{
            unitId: unit.counterpart.counterpartId,
            upgradesEquipped: unit.counterpart.upgradesEquipped,
            totalUnitCost: unit.counterpart.totalUnitCost,
          }}
          instanceLabel="(counterpart)"
        />
      );
    }
  });

  return (
    <div
      ref={ref}
      style={{
        padding: 12,
        background: "white",
        color: "black",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
        {currentList.title || "Army List"} — Stat Reference
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 6,
        }}
      >
        {blocks}
      </div>
      <KeywordGlossary currentList={currentList} />
      <CardSelections currentList={currentList} inkMode={inkMode} />
    </div>
  );
});

function StatsGridButton({ currentList }) {
  const colorRef = React.useRef();
  const saverRef = React.useRef();
  const textRef = React.useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePrintColor = useReactToPrint({ contentRef: colorRef });
  const handlePrintSaver = useReactToPrint({ contentRef: saverRef });
  const handlePrintText = useReactToPrint({ contentRef: textRef });

  const openMenu = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <React.Fragment>
      <Chip
        clickable
        variant="outlined"
        label="Stat Sheet"
        icon={<GridIcon />}
        style={{ marginRight: 4, marginBottom: 4 }}
        onClick={openMenu}
      />
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem
          onClick={() => {
            handlePrintColor();
            closeMenu();
          }}
        >
          Color cards
        </MenuItem>
        <MenuItem
          onClick={() => {
            handlePrintSaver();
            closeMenu();
          }}
        >
          Ink saver (grayscale + faded)
        </MenuItem>
        <MenuItem
          onClick={() => {
            handlePrintText();
            closeMenu();
          }}
        >
          Text only (primaries stay as images)
        </MenuItem>
      </Menu>
      <div
        style={{
          position: "absolute",
          left: -100000,
          top: 0,
          width: "8.5in",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <StatsGridSheet
          ref={colorRef}
          currentList={currentList}
          inkMode="color"
        />
        <StatsGridSheet
          ref={saverRef}
          currentList={currentList}
          inkMode="saver"
        />
        <StatsGridSheet
          ref={textRef}
          currentList={currentList}
          inkMode="text"
        />
      </div>
    </React.Fragment>
  );
}

export default StatsGridButton;
