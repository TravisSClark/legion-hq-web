const keywords = {

  /**
   * TODO, finish current pass of keyword updates, consider expanding schema to make things a little nicer:
   * 
   * {
   * 	"Keyword Name":{
   * 		"text":"...",
   * 		"summary"?:".." // allow expanding to full text for things like, idk, Loadout and Guardian
   * 		"keywords?:"e.g. Ion.keywords=["Ion Token"]
   * 	}
   * }
   * 
   * Determine if parameterizing would be worth the squeeze; e.g. specify "Precise 1" and fill in formatted text,
   * or more pain-in-the-ass ones like Immune:X
   * 
   */


  "Creature Trooper": "You can:  obscure other minis and provide light cover while doing so, pivot and reverse, displace troopers when moving through them. You do not:  improve your cover while you have 1 or more suppression tokens, get cover from barricades, embark or disembark, use CLAIM/SABOTAGE/REPAIR abilities, be displaced",
  "Droid Trooper": "Droid troopers do not lose actions and do not gain cover from suppression. Droids can still become panicked.",
  "Emplacement Trooper": "You can:  pivot, reverse. You cannot:  climb, use CLAIM/SABOTAGE/REPAIR, be displaced, be moved through by ground vehicles. This unit does not obscure LOS.",


  "Advanced Targeting": "When a unit with the Advanced Targeting X keyword makes an \
attack against an enemy unit with the unit type listed, during \
the Form Attack Pool step, it may gain X Aim tokens. A unit \
that uses the Advanced Targeting X keyword may only form 1 \
Attack Pool and skips the Declare Additional Defender step of \
the attack sequence.",
  "Agile": "When a unit with the Agile X keyword makes a Standard Move \
as part of an action or free action, after the effect is resolved, it \
gains X Dodge tokens.",
  "AI": "At the start of a unit with the AI keyword's Make Actions step, if \
it is on the battlefield, does not have a faceup Order token, and \
is not within 3 of an allied COMMANDER unit, it must make 1 of the \
specified actions as its first action that Activation. Free actions \
do not satisfy the requirements of the AI keyword. If a unit \
cannot make any of its listed actions as its first action, it is free \
to make other actions as normal.",
  "Aid": "When a unit with the Aid keyword would gain 1 or more Aim, \
Dodge, or Surge tokens, another allied unit of the Affiliation \
or unit type listed within 2 and in LOS may gain that token \
instead. If it does, the unit with the Aid keyword gains 1 \
Suppression token, if able.",
  "Allies of Convenience": "Units with the Allies of Convenience keyword may issue Orders \
to allied Mercenary units regardless of Affiliation. Additionally, \
when building an army, players may include 1 extra Mercenary \
unit in their army regardless of Rank if there is at least 1 unit \
with the Allies of Convenience keyword, though they cannot \
take more units of a particular Rank than normally allowed.",
  "Armor": "During the Modify Attack Dice step of the attack sequence, if \
the defending unit has the Armor X keyword, the defending \
player may cancel up to X hit results, removing those dice \
from the Attack Pool.",


  "Arsenal": "A unit with the Arsenal X keyword can contribute X weapons to \
Attack Pools during the Form Attack Pool step. Each weapon or \
combination of weapons may form a new Attack Pool, but each \
weapon may only be added to 1 Attack Pool.",
  "Associate": "During Army Building, a unit with the Associate keyword does \
not count its Rank towards the maximum Rank requirements \
for that Rank if a unit with the specified unit name is included \
in the same army.",
  "Ataru Mastery": "A unit with the Ataru Mastery keyword can make up to 2 \
Attack actions during its Activation. When it attacks, it gains \
1 Dodge token after the attack is resolved. When it defends, it \
gains 1 Aim token after the attack is resolved.",
  "Attack Run": "At the start of its Activation, a unit with the Attack Run \
keyword may increase or decrease its Speed by 1 until the end \
of that Activation.",
  "Barrage": "If a unit has the Barrage keyword, it may make 2 Attack actions \
during its Activation instead of 1 if it does not use the Arsenal \
keyword during that Activation.",
  "Block": "When a unit with the Block keyword is defending, if it spends 1 \
or more Dodge tokens during the Apply Dodge and Cover step, \
it gains SURGE:BLOCK until the end of that attack.",
  "Bolster": "As a Card action, a unit with the Bolster X keyword can choose \
up to X allied units within 2 to each gain 1 Surge token.",
  "Bounty": "During Setup, a unit with the Bounty keyword chooses an \
enemy OPERATIVE or COMMANDER unit. The chosen unit gains 1 Bounty token. \
After an allied unit with the Bounty keyword defeats an enemy \
unit that has 1 or more Bounty tokens with an attack or effect, \
the allied unit's controlling player scores 1 VP.",
  "Cache": "During Setup, a unit with an equipped Upgrade Card that has \
the Cache keyword places the listed token(s) on the card with the \
Cache keyword. The unit may spend those tokens, even if \
any miniatures added to the unit with that card are defeated.",

  "Calculate Odds": "As a Card action, a unit with the Calculate Odds keyword can \
choose an allied Trooper unit within 2 and in LOS to gain 1 \
Aim token, 1 Dodge token, and 1 Suppression token.",
  "Charge": "After a unit that has the Charge keyword makes a Move action \
during its Activation that brings it into base contact with an \
enemy miniature to start a Melee, it may make a free Attack \
action against that unit using only Melee weapons.",
  "Climbing Vehicle": "A unit with the Climbing Vehicle keyword can make Climb \
moves and treated as a Trooper unit for the purposes \
of Climbing.",
  "Complete the Mission": "During Setup, for each allied unit with the Complete the \
Mission keyword, place an allied Priority Mission token on the \
battlefield within Contested Territory.\n\
While a unit with the Complete the Mission keyword is within \
1 of 1 or more allied Priority Mission tokens, that unit gains \
SURGE:BLOCK. When a unit with the Complete the Mission keyword \
attacks an enemy unit within 1 of 1 or more allied Priority \
Mission tokens, the attacking unit's Attack Pool gains the \
Critical 2 keyword.",
  "Compel": "After another allied Trooper unit of the matching Rank or unit \
type within 2 of an allied unit with the Compel keyword \
Rallies and is Suppressed but not Panicked, at the start of its \
Make Actions step, it may gain 1 Suppression token to make a \
free Move action.",
  "Coordinate": "After a unit with the Coordinate keyword is issued an Order, \
it may issue an Order to an allied unit within 1 that has the \
unit name or unit type specified. A unit that has 1 or more unit \
names or unit types listed can only choose 1 of these listed unit \
names or unit types to issue an Order to using the Coordinate \
keyword. If a unit already has the Coordinate keyword and \
gains another instance of the keyword, the unit may choose \
which targets to issue an Order to from the multiple instances \
of the keyword; it does not issue 2 Orders.",

  "Counterpart": "While building an army, this mini may be added to an X unit. (See Rulebook)",
  "Cover": "When a unit with the Cover X keyword defends against a Ranged attack, during the Apply Dodge and Cover step, it increases its Cover by X",
  "Cunning": "When determining priority during the Command Phase, if a \
player reveals a COMMANDER or OPERATIVE specific Command Card that belongs \
to a unit with the Cunning keyword and there would be a tie \
for priority, treat that Command Card as having 1 fewer pip. If \
both players reveal a specific COMMANDER or OPERATIVE Command Card that \
belongs to a unit with the Cunning keyword, there is still a tie \
for priority.",

  "Danger Sense": "When a unit with the Danger Sense X keyword would remove \
any number of its Suppression tokens, it may choose to not \
remove up to X tokens, including 0.\n\
While a unit with the Danger Sense X keyword defends against \
an attack, it rolls 1 extra defense die during the Roll Defense \
Dice step for each Suppression token it has, up to X additional \
dice.",
  "Dauntless": "After a unit with the Dauntless keyword Rallies and is \
Suppressed but not Panicked, at the start of its Make Action \
step, it may gain 1 Suppression token to make a free Move \
action. \n\
A unit with the Dauntless keyword may not be affected by the \
Compel keyword.",
  "Death from Above": "When a unit with the Death From Above keyword attacks,\
the defending unit cannot use Cover to cancel hit a results\
during the Apply Cover step if the attacking unit's unit leader\
is overlapping a piece of non-area terrain of greater height than\
any terrain the defending unit's unit leader is overlapping.",
  "Defend": "After a unit with the Defend X keyword is issued an Order, it \
gains X Dodge tokens.",
  "Deflect": "While a unit with the Deflect keyword defends against a Ranged \
attack or uses the Guardian X keyword, its surge conversion \
chart gains SURGE:BLOCK. Additionally, during the Convert Defense \
Surges step before converting SURGE results, the attacker suffers 1 \
Wound if there is at least 1 SURGE result in the defense roll. When \
a unit with the Deflect keyword uses the Guardian X keyword, \
before converting any defense surges using the Soresu Mastery \
keyword, the attacker suffers 1 Wound if at least 1 of the dice \
rolled with Guardian X rolled at least 1 SURGE result. \
If the Deflect keyword causes the attacking unit to be defeated, \
the attack continues, and the defender can still suffer Wounds. \
While defending or using the Guardian X keyword against an \
attack made only with weapons that have the High Velocity \
keyword, the Deflect keyword has no effect.",
  "Demoralize": "After a unit with the Demoralize X keyword Rallies, add up to X \
total Suppression tokens to enemy units within 2",

  "Detachment": "A unit with the Detachment keyword doesn't count against the \
maximum number of units of its Rank that can be included \
during Army Building. A unit with the Detachment keyword \
can be included in a player's army only if another unit that \
has the unit name or unit type specified and does not have the \
Detachment keyword is also included in that army. Each unit \
with the Detachment keyword needs its own matching specified \
unit. Additionally, during the Deploy in Prepared Positions \
step, a unit with the Detachment keyword gains the Infiltrate or \
Prepared Position keyword for the remainder of the game if its \
matching specified unit has that keyword.",
  "Direct": "During the Issue Orders step of the Command Phase, a unit \
with the Direct keyword may issue an Order to an allied unit \
within 2 that has the unit name or unit type specified.",
  "Disciplined": "After a unit with the Disciplined X keyword is issued an Order, \
it may remove up to X Suppression tokens.",
  "Disengage": "A Trooper unit with the Disengage keyword can make Moves as \
normal while it is Engaged with a single enemy unit.",
  "Distract": "As a Free Card action, a unit with the Distract keyword can \
choose an enemy Trooper unit within 2 and in LOS. Until the \
end of the Round, when the chosen enemy unit makes an attack, \
it must attack the unit that used the Distract action, if able. \n\
While the chosen enemy unit is attacking the unit with the \
Distract keyword, each miniature in the enemy unit must choose \
an eligible weapon to contribute to an Attack Pool. The enemy \
unit may only declare additional defenders and form additional \
Attack Pools if, after first forming an Attack Pool with eligible \
weapons, there are still weapons usable by miniatures in the unit \
that were not eligible to be added to the first Attack Pool. \n\
When a unit uses the Distract keyword, if it has the \
Inconspicuous keyword, it loses Inconspicuous until the end of \
the Round.",

  "Divine Influence": "Allied EWOK Trooper units gain Guardian 2: C-3PO while they \
are within 1 and in LOS of an allied C-3PO. While allied \
EWOK Trooper units within 1 and in LOS of an allied C-3PO \
use Guardian X, they may cancel CRIT results as if they were HIT \
results.",
  "Djem So Mastery": "When a unit with the Djem So Mastery keyword defends \
against a Melee attack, during the Compare Results step, the \
attacking unit suffers 1 Wound if the attack roll contains 1 or \
more Blank results.",
  "Duelist": "When a unit with the Duelist keyword makes a Melee attack, if \
it spends 1 or more Aim tokens during the Reroll Attack Dice \
step, the Attack Pool gains the Pierce 1 weapon keyword. While \
a unit with the Duelist keyword defends against a Melee attack, \
if it spends at least 1 Dodge token during the Apply Dodge and \
Cover step, it gains the Immune: Pierce keyword. \
A unit with the Duelist keyword gets these effects in addition to \
the normal effects of spending Aim or Dodge tokens.",
  "Enrage": "When a unit with the Enrage X keyword has Wound tokens \
greater than or equal to X, that unit gains the Charge keyword \
and its COURAGE becomes “-”. If a unit with the Enrage X keyword has \
Wound tokens greater than or equal to X but removes Wound \
tokens through an effect so that it has fewer than X, it no longer \
benefits from the Enrage X keyword until it has Wound tokens \
greater than or equal to X again.",
  "Entourage": "During Army Building, for each unit a player includes with \
the Entourage keyword, 1 unit specified by the Entourage \
keyword does not count its Rank towards the maximum Rank \
requirements for that Rank. This can allow a player to bring \
more units of a specific Rank than Rank requirements allow. \n\
In the Command Phase, during the Issue Orders step, a \
unit with the Entourage keyword may issue an Order to \
an allied unit within 2 that has the name specified by the \
Entourage keyword. \n\
Additionally, the unit specified by the Entourage keyword \
ignores the CORPS Rank requirement to provide Backup to the unit \
with the Entourage keyword.",


  "Equip" : "During Army Building, if a player includes a unit with the \
Equip keyword, that unit must equip the upgrades listed after \
the keyword.",
"Exemplar" : "While attacking or defending, if an allied unit is within 2 \
and in LOS of 1 or more allied units that have the Exemplar \
keyword and share the same Faction or Affiliation as that \
attacking or defending unit, that attacking or defending unit \
may spend an Aim, Dodge, or Surge token belonging to 1 of \
those units with Exemplar as if that attacking or defending unit \
had the token.",
"Expert Climber" : "When a unit with the Expert Climber keyword makes a Climb, \
it may Move a vertical distance up to height 2.",
"Field Commander" : "During Army Building, an army that includes a unit with the \
Field Commander keyword may ignore the minimum COMMANDER \
Rank requirement. If a player's army contains no COMMANDER units \
during Setup but does contain a unit with the Field Commander \
keyword, that unit gains a Commander token. When a player \
reveals a non-COMMANDER or OPERATIVE specific Command Card, they may \
nominate an allied unit with the Field Commander keyword \
to be Commander and issue Orders. A unit with the Field \
Commander keyword is not a COMMANDER and only counts as one for \
the purposes of issuing Orders with a Command Card during \
the Command Phase. \
Additionally, if an allied Unit is within 3 of the unit with \
the Commander token and both units share the same Faction \
or Affiliation, that allied unit may treat their COURAGE as 2 when \
checking for Panic.",
"Fire Support" : "After a unit with the Fire Support keyword is issued an Order, it \
gains a Standby token.",
"Flexible Response" : "During Army Building, a unit with the Flexible Response \
keyword must equip X HEAVY WEAPON upgrades.",
"Full Pivot" : "When a unit with the Full Pivot keyword makes a Pivot, it may \
Pivot up to 360°.",
"Generator" : "During the End Phase, a unit with the Generator X keyword \
may flip up to X inactive Shield tokens to their active side",

"Guardian" : "While an allied Trooper unit within 1 and in LOS of a unit \
that has the Guardian X keyword defends against a Ranged \
attack, it may cancel up to X hit a results during the Modify \
Attack Dice step. For each hit result canceled in this way, the \
unit with the Guardian X keyword rolls 1 defense die matching \
the one on its Unit Card. After converting any defense surge \
results according to its surge chart or by using Surge tokens, the \
unit with the Guardian X keyword suffers 1 Wound for each \
Blank result. A defending unit that has the Guardian X keyword \
used on it gains a Suppression token as normal. \
A unit cannot use Guardian X if the defending unit also has \
the Guardian X keyword. If multiple allied units can use the \
Guardian X keyword during an attack, the player who controls \
those units declares which unit is using the Guardian X \
keyword and resolves their ability before choosing whether to \
declare that another unit is using the Guardian X keyword. \
A unit cannot use Guardian X if it has a number of Suppression \
tokens equal to or greater than its COURAGE. \
The Pierce X keyword can be used to cancel block results on \
defense dice rolled by a unit using Guardian X; treat canceled \
block results as Blank results. After using Pierce X in this \
way, any unused Pierce X value can still be used to cancel block \
results rolled by the defending unit. \n\
Additionally, a unit with the Guardian X keyword cannot \
benefit from Backup and ignores the CORPS Rank requirement to \
provide Backup.",
"Guidance" : "As a Card of Free Card action, a unit with the Guidance \
keyword may choose another allied unit of the specified \
unit type within 2. The chosen unit makes a free \
non-Attack action.",
"Gunslinger" : "When a unit with the Gunslinger keyword reaches the Declare \
Additional Defender step, it may declare an additional defender \
and create an Attack Pool consisting solely of a Ranged weapon \
that has already been contributed to another Attack Pool. The \
Gunslinger keyword can only be used once per attack sequence.",
"Heavy Weapon Team" : "A unit with the Heavy Weapon Team keyword must equip a \
Upgrade Card. The miniature added to the unit with this \
Upgrade Card becomes the unit leader.",

"Hover" : "A unit with the Hover: Ground or Hover: Air X keyword can \
make Standby actions during the Make Actions step and can \
gain and spend Standby tokens. A unit with the Hover: Ground \
or Hover: Air X keyword can make Reverse Moves. \
A unit with the Hover: Ground keyword is treated as a Ground \
Vehicle by other units for all LOS purposes. For all other game \
effects, the unit is still treated as a Repulsor Vehicle. \
A unit with the Hover: Air X keyword ignores terrain of height \
X or lower while Moving and may end a movement overlapping \
such terrain.",
"Strafe" : "If a unit with the Hover: Ground/Air X keyword has a base with \
side notches, the unit may make a Strafe Move as part of a Move \
action instead of moving normally. A Strafe Move is a normal \
notched base Standard Move with the following exceptions: \
• When making a full Strafe Move, instead of placing the \
Movement Tool in the front notch of the unit leader's base, \
place it in one of the side notchs. Then place the opposite \
side notch of the unit leader's base on the other end of the \
Movement Tool. \
• When making a partial Strafe Move, instead of placing the \
Movement Tool wholly in the front notch of the unit leader's \
base at the start of the Move, place the Movement Tool \
wholly in one of the side notches. When ending a partial \
Strafe Move, the miniature must be placed in such a way so \
that the line of the two side notches on its base are parallel \
to the section of the Movement Tool the miniature reached \
at the farthest part of the move. \
• While making a Strafe Move, a unit reduces its Speed by 1 to \
a minimum of 1.",
"Hunted" : "During Setup, if 1 or more enemy units have the Bounty \
keyword, each unit with the Hunted keyword gains 1 \
Bounty token.",
"I'm Part of the Squad Too" : "A unit with the I'm Part of the Squad Too keyword is \
Contesting an Objective token if its unit leader is within 1 of \
that Objective token instead of 1/2.",
"Immune: Blast" : "While a unit with the Immune: Blast keyword is defending, the \
effects of the Blast keyword are ignored.",
"Immune: Enemy Effects" : "A unit with the Immune: Enemy Effects keyword ignores \
all enemy card effects and cannot be targeted by any enemy \
card effects.",

"Immune: Melee" : "Enemy units cannot be placed in base contact with a unit that \
has the Immune: Melee keyword.",
"Immune: Melee Pierce" : "While a unit with the Immune: Melee Pierce keyword is \
defending against a Melee attack, the attacker cannot use the \
Pierce X weapon keyword to cancel BLOCK results on defense dice \
during the Modify Defense Dice step. \
While a unit with Immune: Melee Pierce is using the Guardian \
X keyword during a Melee attack, the attacking unit cannot use \
the Pierce X keyword to cancel BLOCK results on defense dice rolled \
by that unit for the Guardian X keyword.",
"Immune: Pierce" : "While a unit with the Immune: Pierce keyword is defending, the \
attacker cannot use the Pierce X weapon keyword to cancel BLOCK \
results on defense dice during the Modify Defense Dice step. \
While a unit with Immune: Pierce is using the Guardian X \
keyword, the attacking unit cannot use the Pierce X keyword \
to cancel BLOCK results on defense dice rolled by that unit for the \
Guardian X keyword.",
"Immune: Range 1 Weapons" : "An Attack Pool that is assigned to a unit with the Immune: 1 \
Weapons keyword cannot contain weapons with a maximum \
Range of 1.",
"Impervious" : "While a unit with the Impervious keyword is defending, it \
rolls a number of extra defense dice during the Roll Defense \
Dice step equal to the total Pierce X value of weapons in the \
Attack Pool. \
If a unit with Impervious also has the Immune: Pierce keyword, \
then it does not roll extra defense dice for the Impervious \
keyword when defending against an attack with the \
Pierce X keyword.",
"Incognito" : "A unit with the Incognito keyword cannot be attacked by enemy \
units that are not within 1 of it, cannot Contest Objectives, \
and cannot provide Backup. \
If a unit with the Incognito keyword ever makes an attack or \
defends against an attack, it loses the Incognito keyword for the \
remainder of the game. Additionally, at the beginning of a unit \
with the Incognito keyword's Activation, it may choose to lose \
the Incognito keyword for the remainder of the game.",

"Inconspicuous" : "While a unit with the Inconspicuous keyword has 1 or more \
Suppression tokens, attacking enemy units must target another \
unit, if able. When a unit with the Inconspicuous keyword \
Rallies, it may choose to not remove any number of Suppression \
tokens, including 0.",
"Independent" : "At the start of the Activation Phase, if a unit with the \
Independent keyword does not have an Order token, that unit \
may gain X of the listed token(s) or make the listed action as a \
free action.",
"Indomitable" : "When a unit that has the Indomitable keyword Rallies, it rolls \
red defense dice instead of white defense dice.",
"Infiltrate" : "When a unit with the Infiltrate keyword starts its Activaiton, \
if it is undeployed, it may Deploy by placing the unit leader of \
that unit completely within allied Territory. Then the remaining \
miniatures in that unit are placed in Cohesion with their unit \
leader and completely within allied Territory. Miniatures cannot \
overlap impassable terrain when they are placed using Infiltrate.",
"Inspire" : "When a unit with the Inspire X keyword ends its Activation, \
remove up to X total Suppression tokens from other allied units \
within 2.",
"Interrogate" : "During the Command Phase, if a player reveals a Command \
Card that belongs to a unit within 1 of 1 or more enemy \
units with the Interrogate keyword and there would be a tie for \
priority, treat that Command Card as having 1 more pip.",
"Jar'Kai Mastery" : "When a unit with the Jar'Kai Mastery keyword makes a Melee \
attack, it may spend any number of Dodge tokens after \
converting attack surges during the Convert Attack Surges \
step. For each Dodge token spent in this way, change a Blank \
result to a HIT result, a HIT result to a CRIT result, or spend 2 Dodge \
tokens to change a Blank result to a CRIT result.",
"Jedi Hunter" : "When a unit with the Jedi Hunter keyword attacks a unit with \
a  upgrade icon on its upgrade bar, the attacking unit gains \
SURGE:CRIT until the end of that attack.",

"Jump" : "A unit that has the Jump X keyword can make the Jump X Card \
action any time it could make a Move action. The unit makes a \
Move action as normal and can ignore or end its movement on \
top of terrain that is height X or lower. While making a Move \
with the Jump X action, a unit ignores the effects of difficult \
terrain and other miniatures with a height equal to or lower \
than X. When making a Move with the Jump X action, a unit \
may place the Movement Tool overlapping impassable terrain \
but may not end its Move overlapping it. When a unit makes \
the Jump X action, measure height from that unit's starting \
position.",
"Juyo Mastery" : "While a unit with the Juyo Mastery keyword has 1 or more \
Wound tokens, it can make 1 additional action during its Make \
Actions step. A unit with Juyo Mastery may only make 2 Move \
actions during its Activation, including free actions.",
"Latent Power" : "When a unit with the Latent Power keyword ends its Activation, \
it may gain 1 Suppression token to roll 1 red defense die. If it \
does, on a SURGE result, choose an enemy unit within 1 of this \
miniature. The chosen unit gains 2 Suppression tokens and 2 \
Immobilize tokens. On a Blank result, remove 1 Wound or 1 \
Poison token from an allied non-Droid Trooper Trooper unit \
within 1 of this miniature.",
"Low Profile" : "When a unit with the Low Profile keyword would roll 1 or more \
defense dice during the Roll Cover Pool step, it rolls 1 fewer \
defense die and instead adds an additional BLOCK result to the \
Cover Pool after rolling.",
"Makashi Mastery" : "When a unit with the Makashi Mastery keyword makes a Melee \
attack, it can reduce the Pierce X value of a weapon in the \
Attack Pool by 1 during the Choose Weapons and Gather Dice \
step. If it does, the defender cannot use the Immune: Melee \
Pierce, Immune: Pierce, and/or Impervious keywords during \
this attack.",
"Marksman" : "A unit with the Marksman keyword may spend any number of \
Aim tokens after converting attack surges during the Convert \
Attack Surges step. For each Aim token spent in this way, \
instead of rerolling dice, change 1 Blank result to a HIT result, \
1 HIT result to a CRIT result, or spend 2 Aim tokens to change 1 \
Blank result to a CRIT result.",

"Master of the Force" : "When a unit with the Master of the Force X keyword ends \
its Activation, it may ready up to X of its exhausted Force \
Upgrade Cards.",
"Master Storyteller" : "As a Card action, a unit with the Master Storyteller keyword \
may choose up to X allied EWOK units within 2, where X is the \
current Round number. Each chosen unit gains 2 Surge tokens.",
"Mercenary" : "A unit with the Mercenary: Faction keyword is a Mercenary \
unit. The Faction(s) specified by the Mercenary: Faction \
keyword can include that unit in an army as a Mercenary unit.",
"Nimble" : "When a unit with the Nimble keyword defends against an attack \
and spends at least 1 Dodge token during any point of the attack \
sequence, after the attack is resolved, it gains 1 Dodge token.",
"Observe" : "As a Card action, a unit with the Observe X keyword can \
choose an enemy unit within 3 and in LOS. The chosen \
enemy unit gains X Observation tokens. Observation tokens are \
removed during the Remove Tokens step of the End Phase. \
When an allied unit makes an attack, during the Reroll Attack \
Dice step it may spend any number of Observation tokens that \
belong to the defending unit. The attacking unit rerolls 1 attack \
die for each Observation token spent in this way. Observation \
tokens are spent 1 at a time, and the same die can be rerolled \
multiple times by spending subsequent Observation tokens \
or Aim tokens. An attacking unit may spend Aim tokens and \
Observation tokens in any order.",
"One Step Ahead" : "If 1 or more allied units have the One Step Ahead keyword, \
during the Resolve Command Card Effects step, after revealing \
Command Cards but before resolving Command Card effects, \
if the number of pips on the revealed Command Cards do not \
match, 1 allied unit with the One Step Ahead keyword on the \
battlefield may make a Speed-1 Move. If the number of pips do \
match, and there is 1 or more allied units with the One Step \
Ahead keyword on the battlefield, choose an allied unit on the \
battlefield. The chosen unit may make a Speed-1 Move.",
"Outmaneuver" : "A unit with the Outmaneuver keyword can spend Dodge tokens \
to cancel CRIT results during the Apply Dodge and Cover step.",

"Override" : "When an allied unit begins its Activation while within 5 of \
a unit that has the Override keyword, the unit that has the \
Override keyword may gain 1 Suppression token. If it does, the \
activating unit ignores the AI keyword during its Activation.",
"Plodding" : "A unit with the Plodding keyword can only make 1 Move action \
during its Activation.",
"Precise" : "Each time a unit with the Precise X keyword spends an Aim \
token during the Reroll Attack Dice step, it can reroll up to X \
additional attack dice per Aim token spent.",
"Prepared Position" : "During the Deploy in Prepared Positions step of Setup, a unit \
with the Prepared Position keyword may Deploy by placing the \
unit leader of that unit completely within allied Territory. Then \
the remaining miniatures in that unit are placed in Cohesion \
with their unit leader and within allied Territory. That unit then \
gains 1 Dodge token. Miniatures cannot overlap impassable \
terrain when they are placed using Prepared Position.",
"Programmed" : "A unit with the Programmed keyword must equip at least 1 PROTOCOL \
Upgrade Card during Army Building.",
"Pulling the Strings" : "As a Card action, a unit with the Pulling the Strings keyword \
may choose another allied Trooper unit within 2. The chosen \
unit may make a free Attack action or a free Move action.",
"Quick Thinking" : "When a unit makes the Quick Thinking Card action, it gains 1 \
Aim and 1 Dodge token.",
"Ready" : "After a unit with the Ready X keyword makes a Standby action, \
it gains X Aim tokens.",
"Recharge" : "When a unit with the Recharge X keyword makes a Recover \
action, it may flip up to X inactive Shield tokens from their \
inactive side to their active side.",
"Reinforcements" : "At the start of the End Phase of the first Round, a Unit with the \
Reinforcements keyword may make a Speed-1 Move.",
 
"Regenerate" : "When a unit with the Regenerate X keyword ends its Activation, \
it rolls 1 white defense die for each Wound token it has, up to X. \
For each BLOCK or SURGE result, it removes 1 Wound token.",
"Reliable" : "A unit with the Reliable X keyword gains X surge tokens at the \
start of each Activation Phase.",
"Relentless" : "After a unit that has the Relentless keyword makes a Move \
action during its Activation, it may make a free Attack action.",
"Reposition" : "When a unit with the Reposition keyword makes a Standard \
Move, it may make a Pivot either before or after making that \
Standard Move.",
"Retinue" : "At the start of each Activation Phase, if a unit with the Retinue \
keyword is within 2 of another allied unit or unit type \
specified by the Retinue keyword, the unit with the Retinue \
keyword gains either 1 Aim or 1 Dodge token. \
Additionally, a unit with the Retinue keyword ignores the \
CORPS Rank requirement to provide Backup to the specified unit.",
"Ruthless" : "When an allied CORPS Trooper unit with a faceup Order token \
starts its Activation within 2 and in LOS of a unit with the \
Ruthless keyword, that allied unit may suffer 1 Wound to make \
1 free action.",
"Scale" : "When a unit with the Scale keyword makes a Climb, it may \
Move a vertical distance up to height 2. \
When a unit that has the Scale keyword makes a Move, it \
does not reduce its Speed for moving out of, into, or through \
difficult terrain.",
"Scout" : "When an undeployed unit with the Scout X keyword activates, \
at the start of its Make Actions step, it may Deploy by making a \
free Speed-X Move action, ignoring difficult terrain. A unit can \
make this Move regardless of its Speed. \
The Scout X keyword is cumulative but cannot exceed 3. If a \
unit would ever have Scout X exceeding Scout 3, it has Scout \
3 instead.",

"Scouting Party" : "During Setup, each unit with the Scouting Party keyword \
may choose up to X allied Trooper units that do not have the \
Scout keyword that share the same Faction or Affiliation as \
the Scouting Party unit. Each chosen unit gains the Scout X \
keyword, where X is the Scout X value of the unit with the \
Scouting Party keyword.",
"Secret Mission" : "At the beginning of each Command Phase, if a unit with the \
Secret Mission keyword is completely within enemy Territory, it \
gains 1 Secret Mission token. A unit may only ever gain 1 Secret \
Mission token per game. \n\
When scoring VP during the End Phase, if a player controls 1 \
or more units that have a Secret Mission token and are within \
enemy Territory, that player may choose to remove those unit's \
Secret Mission tokens from the game. That player scores 1 VP \
for each Secret Mission token removed in this way.",
"Self-Destruct" : "A unit may make a Self-Destruct X Card action only if it has \
a number of Wound tokens equal to or greater than half of its \
Wound threshold, rounding up. For each unit within 1 and in \
LOS, roll X black attack dice, completely resolving each roll before \
moving to the next unit. That unit suffers 1 Wound for each SURGE and \
CRIT result rolled, then gains 1 Suppression token for each HIT result \
rolled. After all rolls are resolved, this unit is defeated.",
"Self-Preservation" : "A unit with the Self-Preservation keyword cannot use the COURAGE \
of units that are not of the same Affiliation when checking \
for Panic.",
"Sentinel" : "A unit with the Sentinel keyword can spend a Standby token \
after an enemy unit makes an attack, Move, or action within \
3, rather than within 2.",
"Sharpshooter" : "During the Determine Cover step, a unit with the Sharpshooter \
X keyword subtracts X from the numerical value of the \
defender's Cover.\n\
For example, a unit with heavy Cover and 1 Suppression token \
that is attacked by a unit with Sharpshooter 1 has light Cover",
"Shielded" : "A unit with the Shielded X keyword has X Shield tokens. Shield \
tokens belong to the unit and are not assigned to individual \
miniatures. If a unit gains the Shielded X keyword, it gains X \
Shield tokens. Similarly, if a unit loses the Shielded X keyword it \
loses X Shield tokens. \n\
Shield tokens are double-sided, with an active side and an \
inactive side, and always enter play with their active side faceup \
placed on the battlefield next to the unit that has those Shield \
tokens. When a unit flips an active Shield token, that Shield \
token is flipped to its inactive side and is now inactive. When a \
unit flips an inactive Shield token, that Shield token is flipped to \
its active side and is now active. \n\
While defending against a Ranged attack, a defending unit \
may flip any number of its active Shield tokens to their inactive \
side during the Modify Attack Dice step to cancel 1 hit a or 1 \
critical CRIT result for each Shield token flipped in this way.",
"Shien Mastery" : "When a unit with the Shien Mastery keyword uses the Deflect \
keyword, the attacker suffers 1 Wound for each SURGE result in the \
defense roll instead of any other Wounds Deflect would cause. \
Additionally, when a unit with the Shien Mastery keyword is the \
defending unit of a Ranged attack, if it does not suffer Wounds \
from that attack, it does not gain Suppression tokens during the \
Assign Suppression Token to Defender step of that attack.",
"Smoke" : "A unit that has the Smoke X keyword can make the Smoke X \
action to place X Smoke tokens comepletely within 1 and in \
LOS of its unit leader.\n\
Smoke tokens cannot overlap any Objective, Advantage, Charge, \
or other Smoke tokens and must be placed on a flat surface. \n\n\
SMOKE TOKENS: Trooper units whose unit leader is within 1 of a Smoke token \
improve the numerical value of their Cover by 1 during the \
Determine Cover step. While a Trooper unit is attacking, if \
the attacking unit leader is within 1 of a Smoke token, the \
defending unit improves the numerical value of their Cover \
by 1. Effects that improve a unit's Cover are cumulative. A unit \
cannot be affected by the same Smoke token more than once. \
Smoke tokens are removed during the Remove Tokens step of \
the End Phase. \n\
For example, a Trooper unit whose unit leader is within 1 of \
2 Smoke tokens would improve the numerical value of its Cover \
by 2.",
"Special Issue" : "A unit with the Special Issue keyword can only be included in \
an army using the specified Battle Force",
 
"Soresu Mastery" : "When a unit with Soresu Mastery defends against a Ranged \
attack, it may reroll all of its defense dice during the Reroll \
Defense Dice step. Additionally, when a unit with Soresu \
Mastery is using the Guardian X keyword, it may spend 1 \
Dodge token before converting any SURGE results. If it does, it \
rerolls all its defense dice before converting SURGE results. Each die \
cannot be rerolled more than once using Soresu Mastery.",
"Speeder" : "A unit with the Speeder X keyword can Move over or end \
its movement on terrain equal to or less than height X. \
Additionally, when a unit with the Speeder X keyword on \
notched bases makes a Move, it skips step 1 of notched \
base movement. \n\
A unit with the Speeder X keyword must make a free \
compulsory Move action at the start or end of its Make \
Actions step. \n\
If a unit with the Speeder X keyword makes more than 1 \
non-compulsory Move action during its Activation, it may not \
claim Asset tokens that Activation. Additionally, a unit with the \
Speeder X keyword that has claimed an Asset token can make \
only 1 non-compulsory Move action during its Activation. \n\n\
COMPULSORY MOVE: A compulsory Move is a free Move action. To make a \
compulsory Move, the unit makes a full Move at its Speed. If it \
cannot do so, or if a full Move would cause any part of the unit \
leader's base to be outside the battlefield, it can make a partial \
Move instead, ending its movement as far along the Movement \
Tool as possible.",
"Spotter" : "As a Card or Free Card action, a unit with the Spotter X \
keyword can choose up to X allied units within 2. Each \
chosen unit gains 1 Aim token.",
"Spur" : "When a unit with the Spur keyword makes a Move, it may gain \
1 Suppression token to increase its Speed by 1 during that Move \
to a maximum of 3. When a unit makes a Move, apply any \
effects that increase the unit's Speed before applying any effects \
that reduce that unit's Speed. \n\n\
For example, a unit that normally has a Speed of 1, but has 1 \
Immobilize token, can use the Spur keyword to make a Move with \
a total Speed of 1. However, a unit that normally has a Speed of \
1, but has 2 Immobilize tokens, cannot use the Spur keyword to \
make a Move because its Speed would still be 0.",

"Stationary" : "A unit with the Stationary keyword cannot make Moves \
unless the Move is a Pivot. A unit with the Prepared Position \
and Stationary keywords must Deploy during the Deploy in \
Prepared Positions step of Setup.",
"Steady" : "After a unit that has the Steady keyword makes a Move action \
during its Activation, it may make a free Attack action. Only \
Ranged weapons can be added to Attack Pools during this \
Attack action.",
"Strategize" : "When a unit makes the Strategize X action, it gains 1 \
Suppression token, then chooses X allied units within 2. Each \
chosen unit gains 1 Aim token and 1 Dodge token.",
"Tactical" : "When a unit with the Tactical X keyword makes a Standard \
Move as part of an action or free action, after the effect is \
resolved, it gains X Aim tokens.",
"Take Cover" : "As a Card or Free Card action, a unit with the Take Cover \
X keyword can choose up to X allied units within 2. Each \
chosen unit gains 1 Dodge token.",
"Teamwork" : "While a unit with the Teamwork keyword is within 2 of an \
allied unit that has the unit name specified by the Teamwork \
keyword, if either unit gains 1 or more Aim tokens or 1 or more \
Dodge tokens, the other unit gains 1 token of the same type.",
"Target" : "After a unit with the Target X keyword is issued an Order, it \
gains X Aim tokens.",
"Tempted" : "If an allied unit is defeated by an enemy attack and the attacking \
unit is within 3 of a unit with the Tempted keyword, after \
the attack is resolved, that unit with the Tempted keyword \
may make a free Attack action or a Speed-2 Move ignoring \
difficult terrain. A unit may use the Tempted keyword only once \
each Round.",
"Transport" : "During Setup, a unit with the Transport keyword may choose \
an allied CORPS Trooper or n Trooper unit to transport. During \
the first Round's Issue Orders step, a unit with the Transport \
keyword may issue an Order to the chosen unit. If the chosen \
unit is undeployed when the unit with the Transport keyword \
Deploys, after the effect is resolved, the chosen unit Deploys by \
making a Speed-1 Move. Measure the start of this Move with \
both prongs of one side of the Movement Tool touching the \
base of the unit with the Transport keyword. When the chosen \
unit Deploys in this way, the unit leader of that unit measures \
the vertical distance changed during that Move starting from \
the unit with the Transport keyword.",
 
"Uncanny Luck" : "While a unit with the Uncanny Luck X keyword defends, it may \
reroll up to X defense dice during the Reroll Defense Dice step. \
Any dice rerolled with the Uncanny Luck X keyword must be \
rerolled at the same time, and each die cannot be rerolled more \
than once.",
"Unconcerned" : "A unit with the Unconcerned keyword cannot benefit \
from Cover, and miniatures in the unit cannot be Repaired \
or Restored.",
"Unhindered" : "When a unit that has the Unhindered keyword makes a Move, \
it does not reduce its Speed for moving out of, into, or through \
difficult terrain.",
"Unstoppable" : "A unit with the Unstoppable keyword is eligible to activate \
during the Activation Phase while it has 1 or fewer Order \
tokens. This unit may never have more than 1 faceup Order \
token. While this unit is not defeated, when its controlling \
player is creating their Order Pool, they add an additional Order \
token corresponding to this unit's Rank to their Order Pool.",
"Weak Point" : "While a unit with the Weak Point X: Front/Rear/Sides keyword \
defends, if the attacking unit's unit leader is at least partially \
inside the specified firing arc of the defending unit, the Attack \
Pool gains the Impact X keyword where X is equal to the value \
of Weak Point X. \n\
While a unit with the Weak Point X keyword defends against a \
Ranged attack made by an area weapon, treat the Charge token \
or Advantage token as the attacking unit leader.",
"Weighed Down" : "A unit with the Weighed Down keyword cannot use the Jump \
keyword while it is holding 1 or more Objective tokens.",
"We're Not Regs" : "A unit with the We're Not Regs keyword cannot spend Green \
tokens on other Clone Trooper units, and other Clone Trooper \
units cannot spend this unit's Green tokens. Additionally, this \
unit cannot benefit from Backup.",

"Wheel Mode" : "At the start of its Activation, a unit with the Wheel Mode \
keyword can increase its Speed to 3 until the end of that \
Activation. If it does, until the end of the Round, it gains the \
Cover 2 keyword and cannot attack or flip active Shield tokens. \
To indicate that a unit of Droidekas is using the Wheel Mode \
keyword, a player may replace their standing Droideka \
miniatures with ball-form Droideka miniatures, or simply mark \
the unit with a Wheel Mode token until the end of the Round. \
Players should use the ball-form Droideka miniatures only \
when the unit uses the Wheel Mode keyword and only for the \
duration of that Round. At the end of the Round, any ball- \
form Droideka miniatures should be replaced with standing \
Droideka miniatures.",
"Wound" : "The first time a unit with the Wound X keyword enters play, \
that unit suffers X Wounds.",
 
// Weapon keywords
 
"Area Weapon" : "A weapon with a yellow Range icon is an area weapon. When \
using an area weapon, make a separate attack against each unit, \
allied and enemy, that is in LOS and within the Range indicated \
by the number on the Range icon, even if that unit is Engaged. \
Attacks made by area weapons are always Ranged attacks. \
Area weapons can never be in an Attack Pool made by a unit \
and must always be the only weapon in an Attack Pool.",
"Arm" : "A unit that is equipped with a card that has the Arm X: Charge \
Token Type keyword can make the Arm X action. When a unit \
makes the Arm X action, the unit places X Charge tokens of \
the specified type and matching its controlling player's color \
completely within 1 and LOS of its unit leader. \n\
Charge tokens cannot overlap any Objective, Advantage, or \
other Charge tokens and must be placed on a flat surface \
completely flush with that surface.",
"Beam" : "If a weapon with the Beam X keyword is in a unit's Attack \
Pool during the Declare Additional Defender step, that unit \
may declare up to X additional attacks, forming Attack Pools \
using only the weapon with the Beam X keyword, even though \
the weapon has already been added to an Attack Pool. These \
additional attacks do not generate further attacks. \n\
Each additional attack must be against a different defending \
unit that is within 1 of the last defending unit declared. \
These additional attacks must be in LOS of the attacking \
unit but do not have to be within the maximum Range of the \
weapon with the Beam X keyword.\n\
Units may not use the Beam X and Gunslinger keywords during \
the same attack.",
"Blast" : "A defending unit cannot use light or heavy Cover during the \
Apply Dodge and Cover step to cancel hit a results produced by \
an Attack Pool that contains the Blast keyword.",
"Critical" : "When a unit attacks, if the Critical X keyword is in the Attack \
Pool, during the Convert Surges step it may convert up to X SURGE \
results to CRIT results.",
 
"Cumbersome" : "A unit that has a weapon with the Cumbersome keyword \
cannot make a Move prior to making an attack using that \
weapon during the same Activation, unless the Move is a Pivot.",
"Detonate" : "After a unit attacks, Moves, or makes an action, each unit that \
has a weapon with the Detonate X keyword may Detonate up \
to X allied Charge tokens of the specified type. If a token would \
detonate, that token detonates before any other abilities or \
effects that occur after a unit Moves or makes an action, with \
the exception of spending a Standby token which can be spent \
by a unit before the token detonates. If both players have units \
that could detonate Charge tokens, the player that does not \
control the unit that just made the attack, Move, or action may \
use their unit's Detonate X keyword first. \n\
When a token detonates, make a separate attack against each \
unit, allied and enemy, that has LOS to the token and is in \
Range of the area weapon, using the surge conversion chart and \
weapon keywords on the card for the token being detonated. The \
detonating token is considered the attacking unit when making \
attacks, meaning that it cannot spend Aim tokens or modify \
attack dice, regardless of any abilities on the unit that placed the \
token. After a token detonates, remove it from the battlefield.",
"Fixed" : "To add a weapon that has the Fixed: Front or Fixed: Rear \
keyword to an Attack Pool, the defending unit must have at \
least 1 of its miniatures' bases partially inside the specified firing \
arc of the attacking miniature.",
"High Velocity" : "A unit that defends against an attack that only has weapons with \
High Velocity in its Attack Pool cannot spend Dodge tokens \
during the Apply Dodge and Cover step.",
"Immobilize" : "A unit that suffers 1 or more Wounds from an attack that has \
Immobilize X in the Attack Pool gains X Immobilize tokens. \n\
When a unit makes a Move, its Speed is reduced by 1 for each \
Immobilize token it has. After modifiers, if a unit is Speed \
is 0 it cannot make Moves of any kind. At the end of a unit's \
Activation, it removes any Immobilize tokens that it has. \n\
When a unit makes a Move, apply any effects that increase the \
unit's Speed before applying any effects that reduce its Speed.",
"Immune: Deflect" : "When a unit attacks with an Attack Pool that has Immune: \
Deflect, it cannot suffer Wounds from the Deflect keyword.",
 
"Impact" : "When a unit attacks, if its Attack Pool has the Impact X \
keyword and the defending unit has the Armor X keyword, \
the attacking unit can modify up to X a results to CRIT results \
during the Modify Attack Dice step.",
"Ion" : "When a Vehicle or Droid Trooper unit suffers 1 or more \
Wounds from an attack that has the Ion X keyword in the \
Attack Pool, after the attack is resolved, it gains X Ion tokens. \n\
When a unit starts its Activation with 1 or more Ion tokens, \
roll 1 white defense die for each Ion token it has. If any Blank \
results are rolled, that unit makes 1 fewer action during that \
Activation. At the end of a unit's Activation, it removes any Ion \
tokens that it has. \n\
If an Attack Pool includes the Ion X keyword, at the start of \
the Modify Attack Dice step, before resolving other effects the \
defending unit must flip up to X active Shield tokens, if able, for \
each a or CRIT result in the attack roll.",
"Lethal" : "When a unit makes an attack with an Attack Pool that has \
Lethal X, it can spend up to X Aim tokens during the Modify \
Attack Dice step. If it does, the Attack Pool gains Pierce 1 for \
each Aim token spent. The attacking unit may not reroll dice \
with any Aim tokens spent in this way.",
"Long Shot" : "When a unit with a weapon that has the Long Shot keyword \
makes an attack, before choosing an enemy unit to attack \
during the Declare Defender step, it may spend 1 Aim token to \
increase the maximum Range of that weapon by 1 until the end \
of that attack sequence. The attacking unit may not reroll dice \
with any Aim tokens spent in this way. Only 1 Aim token may \
be spent in this way per attack sequence.",
 
"Overrun" : "A weapon with a red overrun Range icon (8) is an Overrun \
weapon and can only be used during Overrun attacks. Overrun \
attacks are not Ranged or Melee attacks. A unit may make X \
Overrun attacks during its activation. A unit with an Overrun \
weapon can make an Overrun attack after it makes a Standard \
Move in which the Movement Tool or one of its miniatures' \
bases overlapped an enemy miniature's base. After the Move is \
resolved, the unit with the Overrun weapon makes an attack \
against the unit it moved through, and ignores Range when \
making this attack. A unit can only form 1 Attack Pool when \
making an Overrun attack, and only weapons with the Overrun \
X keyword can be added to the Attack Pool. The Overrun \
weapon is only added to the Attack Pool once, even if there are \
multiple miniatures in the unit. \n\
If a unit can make multiple Overrun attacks during its \
Activation, it must make a separate Move through an enemy \
unit for each Overrun attack.",
"Pierce" : "When a unit attacks with an Attack Pool that has Pierce X \
keyword it may cancel up to X BLOCK results during the Modify \
Defense Dice step.\n\
The Pierce X keyword can be used to cancel BLOCK results on \
defense dice rolled by a unit using the Guardian X keyword. \
When doing so, treat canceled BLOCK results as Blank results. After \
using the Pierce X keyword in this way, any unused Pierce \
X value can still be used to cancel BLOCK results rolled by the \
defending unit. \n\
For example, a unit with Pierce 3 attacks an enemy unit, and \
another enemy unit uses Guardian 2 to cancel 2 a results. After \
converting defense SURGE results, the unit using Guardian has rolled \
2 BLOCK results. The attacking unit uses Pierce to cancel the 2 BLOCK \
results and the unit using Guardian suffers 2 Wounds. \n\
Now the defending unit rolls defense dice and the attacking unit \
may cancel 1 more BLOCK result rolled by the defending unit since \
only 2 of its original Pierce 3 have been used so far.",
"Poison" : "A non-Droid Trooper Trooper unit that suffers 1 or more \
Wounds caused by an Attack Pool that has the Poison X \
keyword gains X Poison tokens. \n\
When a unit with 1 or more Poison tokens ends its Activation, \
it suffers 1 Wound for each Poison token it has, then removes all \
of its Poison tokens.",
 
"Primitive" : "When a unit attacks, if its Attack Pool has the Primitive \
keyword and the defending unit has the Armor X keyword, \
after resolving any instances of the Impact X keyword during \
the Modify Attack Dice step, the attacking unit must modify all \
CRIT results to a results.",
"Ram" : "While a unit makes an attack with an Attack Pool that has \
the Ram X keyword, during the Modify Attack Dice step, it \
may change X results to CRIT results if it meets either of the \
following conditions: \n\
• The unit leader has a notched base and the unit made at \
least 1 full Standard Move at its Speed during the same \
Activation as an attack using Ram X. \n\
• The unit leader has an unnotched base and the unit made at \
least 1 Move during the same Activation as an attack using \
Ram X.",
"Scatter" : "When a unit attacks a small based Trooper unit with an Attack \
Pool that has the Scatter keyword, after the attack is resolved, \
it may place any of the non-unit leader miniatures in the \
defending unit in Cohesion.",
"Spray" : "When a miniature adds a weapon that has the Spray keyword \
to an Attack Pool, that weapon adds its dice a number of times \
equal to the number of miniatures in the defending unit that are \
in LOS of the miniature using that weapon. \n\
For example, if an AT-RT with a flamethrower attacks a unit of \
3 Death Troopers, since the flamethrower has the Spray keyword \
and an attack value of 2 black die, the flamethrower contributes \
6 black attack dice to the Attack Pool.",
"Suppressive" : "When a unit defends against an Attack Pool that has \
Suppressive, it gains 1 additional Suppression token during the \
Assign Suppression Token to Defender step.",
"Tow Cable" : "After a Vehicle suffers 1 or more Wounds from an attack that \
has Tow Cable in the Attack Pool, the attacking player makes a \
Pivot with that Vehicle, then it gains 1 Immobilize token.",
"Versatile" : "Units can make Ranged attacks with a weapon that has the \
Versatile keyword even when they are Engaged. A weapon \
with the Versatile keyword that is both a Ranged weapon and a \
Melee weapon can be used to make either a Ranged attack or a \
Melee attack.",
 

// Upgrades/CCs
"Bane Tokens" : "Cad Bane has a set of 3 unique Bane tokens that he can place \
on the battlefield. Bane tokens are double-sided, with a uniform \
back and 3 different images on the front, each linked to a \
unique effect. \n\
Bane tokens must be placed facedown on the battlefield and \
cannot overlap Objective or Advantage tokens. Bane tokens \
are enemy effects. Each player may only have 1 copy of each \
different Bane token on the battlefield at the same time. \n\
When an enemy miniature Moves, Deploys, or is placed within \
1 of an enemy Bane token, if that miniature has LOS to \
the token, that Bane token is revealed. Miniatures can Move \
through but not overlap Bane tokens. When a Bane token is \
revealed, it has 1 of the following effects (Here I Am, Smoke and Mirrors, Kablamo!):",
"Here I Am": "If Cad Bane is not on the battlefield and is not \
defeated, his Here I Am token is replaced by his miniature. \
Then, Cad Bane issues himself an Order. \n\
• If Cad Bane is on the battlefield, his Here I Am token is \
replaced by his miniature. Any tokens assigned to Cad Bane \
remain assigned to him. \n\
• If Cad Bane is defeated, the token is removed. \n\
• At the start of each Round, starting with the blue player, a \
player may reveal an allied Here I Am token and resolve it.",
"Smoke and Mirrors": "The token is removed.",
"Kablamo!": "The token detonates using the weapon profile on \
Cad Bane's I Make the Rules Now Command Card, then the \
token is removed.",
"Cycle" : "At the end of a unit's Activation, ready each of its exhausted \
Upgrade Cards with the Cycle keyword that was not used \
during that Activation. Only using the weapon, keywords, or \
other card text on the card counts as using that Upgrade Card.",

"Divulge" : "Some Command Cards have the Divulge keyword. Command \
Cards that contain the Divulge keyword are divided by a \
horizontal line, which serves to visually separate the Divulge \
keyword effect from the normal Command Card effect. Some \
Divulge cards have multiple options, in this case the player must \
pick 1. These cards can be revealed at the start of the phase or \
step indicated by the Divulge keyword. If a card is revealed in \
this manner, resolve the text that follows the Divulge keyword. \n\
A card that is revealed in this way is not played and is returned \
to that player's Command Hand at the end of the step in which \
it was Divulged. Players can Divulge as many Command Cards \
as they wish. If both players have Command Cards that are \
Divulged at the same time, the blue player can reveal their \
Command Card first. If this opportunity is declined, that card \
can no longer be Divulged.",
"Graffitti Tokens" : "A Graffiti token represents a striking image or symbol painted \
onto the terrain of the battlefield. Graffiti tokens affect a unit's \
morale. Graffiti tokens have 2 sides. Players should place the \
Graffiti token flat on a surface so that the side that corresponds \
to their player color is faceup. \n\
During a unit's Rally step, it may roll 1 additional die if it has \
LOS to and is within 2 of an allied Graffiti token. If it has LOS \
and is within 2 of an enemy Graffiti token, it must roll 1 fewer \
die, to a minumum of 1. \n\
Graffiti tokens remain in play until the end of the game. Units may \
Move through and end a movement overlapping Graffiti tokens.",
"Leader" : "A miniature with the Leader keyword is treated as a unit's unit \
leader for all rules purposes. \n\
If a miniature with the Leader keyword and a Wound threshold \
of 2 or more is defeated while in a unit with a Wound threshold \
of 1, replace 1 of the remaining miniatures in that unit as \
normal, then assign the miniature with the Leader keyword 1 \
Wound token. \n\
Each unit may only equip 1 upgrade card with the \
Leader keyword.",
"Noncombatant" : "A miniature with the Noncombatant keyword cannot add \
any weapons to Attack Pools, and any Wounds suffered \
must be assigned to non-unit leader miniatures without \
the Noncombatant keyword, if able. If a miniature with the \
Noncombatant keyword already has 1 or more Wound tokens, \
it must be assigned Wounds before miniatures that do not have \
Wound tokens. If the unit leader miniature in a unit with the \
Noncombatant keyword is defeated, a Noncombatant miniature \
cannot be replaced by a new unit leader miniature unless there \
are no other miniatures without the Noncombatant keyword.",

"Permanent" : "Some Command Cards have the Permanent keyword. Unlike \
ordinary Command Cards, these cards are not discarded from \
play during the End Phase and their effects persist as long as \
they are in play.",
"Reconfigure" : "When a unit equipped with an Upgrade Card that has the \
Reconfigure keyword makes a Recover action, that unit's \
controlling player may flip that Upgrade Card to a different side \
in addition to any other effects of that Recover action. \
If an Upgrade Card has the exhaust icon, using the Reconfigure \
ability does not cause that Upgrade Card to be exhausted.",
"Repair" : "When a unit uses the Repair X: Capacity Y Card or Free Card \
action, choose an allied Droid Trooper or Vehicle unit within \
1 and LOS and place 1 Wound token on the card that has \
the Repair X: Capacity Y keyword. Remove a total of up to 1 \
Wound, Ion, and/or Vehicle Damage tokens from the chosen \
unit or Restore up to X miniatures to that unit. This ability \
cannot be used if the card that has the Repair X: Capacity \
Y keyword has a number of Wound tokens on it equal to or \
exceeding Y. \n\
Wound tokens on cards are not considered to be on units and \
do not count toward a unit's Wound Threshold, nor can they be \
removed by abilities that remove Wound tokens from units. \n\
A unit that has multiple Repair X: Capacity Y actions treats \
each keyword as a separate action, and can use each action \
once during its Activation, even if the unit has access to mutiple \
identical actions from different sources.",
"Restore" : "Some abilities, such as the Treat and Repair keywords or certain \
card effects, allow a player to Restore miniatures to allied units. \
To Restore a miniature to a unit, that unit must have had 1 or \
more miniatures defeated that Round. Choose a miniature \
that was defeated during the current Round and place that \
miniature on the battlefield in Cohesion with its unit leader. \
Then, give that miniature a number of Wound tokens equal to 1 \
less than the Wound threshold indicated on its Upgrade Card or \
Unit Card.",
"Sidearm" : "If an upgrade has the Sidearm: Melee keyword, the miniature \
added by that upgrade or that has that upgrade equipped \
cannot add any Melee weapons to Attack Pools other than any \
Melee weapons on the Upgrade Card with the Sidearm: Melee \
keyword. \n\
If an upgrade has the Sidearm: Ranged keyword, the miniature \
added by that upgrade or that has that upgrade equipped \
cannot add any Ranged weapons to Attack Pools other than \
any Ranged weapons on the Upgrade Card with the Sidearm: \
Ranged keyword.",

"Small" : "A unit that has 1 or more Counterpart miniatures with the \
Small keyword cannot be targeted with attacks if the attacking \
unit leader only has LOS to the Counterpart miniature with the \
Small keyword",
"Treat" : "When a unit uses the Treat X: Capacity Y Card or Free Card \
action, choose an allied non-Droid Trooper Trooper unit \
within 1 and LOS and place 1 Wound token on the card that \
has the Treat X: Capacity Y keyword. Remove a total of up to X \
Wound and/or Poison tokens from the chosen unit or Restore \
up to X miniatures to that unit. This ability cannot be used if the \
card that has the Treat X: Capacity Y keyword has a number of \
Wound tokens on it equal to or exceeding Y. \n\
Wound tokens on cards are not considered to be on units and \
do not count toward a unit's Wound threshold, nor can they be \
removed by abilities that remove Wound tokens from units. \n\
A unit that has multiple Treat X: Capacity Y actions treats each \
keyword as a separate action, and can use each action once \
during its Activation, even if the unit has access to mutiple \
identical actions from different sources."
}

export default keywords;