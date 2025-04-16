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
  "AI": "At the start of a unit with the AI keyword’s Make Actions step, if \
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
the allied unit’s controlling player scores 1 VP.",
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
Mission tokens, the attacking unit’s Attack Pool gains the \
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

  "Detachment": "A unit with the Detachment keyword doesn’t count against the \
maximum number of units of its Rank that can be included \
during Army Building. A unit with the Detachment keyword \
can be included in a player’s army only if another unit that \
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


  "Equip": "During Army Building, the listed upgrades must be equipped to this unit.",
  "Exemplar": "While attacking or defending, if a friendly unit is at range 2 and in LOS of a one or more friendly units \
that have the Exemplar keyword and that share the same faction or affiliation as that attacking or defending unit, \
that attacking or defending may spend aim, dodge, and surge tokens belonging to a unit with Exemplar.",
  "Expert Climber": "When this unit performs a climb, it may move a vertical distance up to height 2.",
  "Field Commander": "During Army Building, an army that includes a unit with the Field Commander keyword may ignore \
the minimum Commander rank requirement. If a player’s army contains no Commander units during Setup but does contain \
a unit with the Field Commander keyword, that unit gains a commander token.\n\n\
When a player reveals a non-Commander or Operative specific Command Card, they may \
nominate a friendly unit with the Field Commander keyword to be commander and issue orders. \
A unit with the Field Commander keyword is not a p and only counts as one for the purposes \
of issuing orders with a Command Card during the Command Phase.\n\n\
If a friendly unit is at range 3 of a Field Commander unit with the commander token and both units share the same faction or \
affiliation, that friendly unit may treat their courage value as 2 when checking for panic.",
  "Fire Support": "After you are issued an order, gain a standby token.",
  "Flawed": "Add your Flaw card to your opponent’s command hand during Setup.\n\n\
An opponent may play a Flaw Card from their command hand when permitted by the \
rules on the Flaw Card. If both players have a Flaw Card in their command hand, \
at the start of each phase the player with priority must decide first whether \
to play a Flaw Card or not. If neither player has priority, then the blue player \
decides first. Any played Flaw Cards are discarded at the start of the End Phase \
and their effects end.\n\n\
Flaw Cards are not Command Cards and are not affected by rules that affect Command Cards.",
  "Flexible Response": "During Army Building, you must equip X heavy weapon upgrades",
  "Full Pivot": "When you pivot, you can pivot up to 360 degrees.",
  "Generator": "During the End Phase, flip X inactive shield token(s) to their active side.",
  "Guardian": "While a friendly trooper unit at 1 and in LOS of a unit that has Guardian X is defending \
against a ranged attack, it may cancel up to X hit a results during the Modify Attack Dice step of the attack \
sequence. For each hit a result canceled in this way, the unit with Guardian X rolls a defense die \
matching the one on its Unit Card. After converting any defense surge e results according to its surge chart or \
by using surge tokens, the unit with Guardian X suffers one wound for each blank result. A defending \
unit that has Guardian X used on it gains a	suppression token as normal.\n\n\
A unit cannot use Guardian X if the defending unit also has Guardian X. \
If multiple friendly units can use Guardian X during an attack, the player who controls those units \
declares which unit is using Guardian X and resolves their ability before choosing whether to declare \
that another unit is using Guardian X.\n\n\
A unit cannot use Guardian X if it has a number of suppression tokens equal to or greater than its courage.\
Pierce X can be used to cancel block d results on defense dice rolled by a unit using Guardian X; \
treat canceled block results as blank results. After using Pierce X in this	way, any unused Pierce X value \
can still be used to cancel block results rolled by the defending unit.\n\n\
A unit with Guardian X cannot benefit from backup and ignores the Corps rank requirement to provide backup.",
  "Guidance": "Choose another friendly trooper at range 2 to perform a free non-attack action.",
  "Gunslinger": "During the Declare Additional Defender step, you may declare an additional defender using a single \
ranged weapon used in another attack. This can only be done once per attack sequence.",
  "Heavy Weapon Team": "You must equip a Heavy Weapon upgrade card. The mini added by that card is your unit leader.",
  "Hover: Ground": "You can perform a standby action, and can gain and spend standby tokens. You can reverse.\n\n\
You are treated as a ground vehicle by other units for all LOS purposes.\n\n\
If you have a base with side notches, you may Strafe.",
  "Hover: Air": "You can perform a standby action, and can gain and spend standby tokens. You can reverse.\n\n\
You ignore terrain of height of X or lower while moving and may end a movement overlapping such terrain.\n\n\
If you have a base with side notches, you may Strafe.",
  "Strafe": "If a unit with the Hover: Ground/Air X keyword has a base with \
side notches, the unit may make a Strafe Move as part of a Move \
action instead of moving normally. A Strafe Move is a normal \
notched base Standard Move with the following exceptions:\n\
• When making a full Strafe Move, instead of placing the \
Movement Tool in the front notch of the unit leader’s base, \
place it in one of the side notchs. Then place the opposite \
side notch of the unit leader’s base on the other end of the \
Movement Tool. \
• When making a partial Strafe Move, instead of placing the \
Movement Tool wholly in the front notch of the unit leader’s \
base at the start of the Move, place the Movement Tool \
wholly in one of the side notches. When ending a partial \
Strafe Move, the miniature must be placed in such a way so \
that the line of the two side notches on its base are parallel \
to the section of the Movement Tool the miniature reached \
at the farthest part of the move. \
• While making a Strafe Move, a unit reduces its Speed by 1 to \
a minimum of 1.",
  "Hunted": "During Setup, if one or more enemy units have the Bounty keyword, each unit with the Hunted keyword gains a bounty token.",
  "I'm, Part of the Squad Too": "You contest an objective token if your unit leader is at range 1 of that token instad of 1/2 range.",
  // TODO; this is kind of a mess; fix it via updating keywords to be parameterized for different immunes and the numeric values
  "Immune": "X cannot be used against you.",
  "Impervious": "While defending, if the attack pool has Pierce X, roll X additional defense dice. Do not roll these additional dice if you have IMMUNE: PIERCE.",
  "Incognito": "You cannot be attacked by enemy units beyond range 1 of it, cannot contest objectives, and cannot provide backup.\n\n\
If a unt with Incognito keyword performs an attack or defends against an attack, it loses all special rules of Incognito for the remainder of the game.\
At the beginning of your activation, you may choose to lose the special rules of Incognito for the remainder of the game.",
  "Inconspicuous": "If you have at least one suppression token, an enemy unit must target another unit, if able.\
During your Rally step, you may choose to not to remove any number of your suppression tokens, including zero.",
  "Independent": "At the start of the Activation Phase, if you do not have an order token, gain X tokens or perform the listed action as a free action.",
  "Indomitable": "During your Rally step, roll red defense dice instead of white.",
  "Infiltrate": "At the start of your activation, if you are undeployed, you may deploy by placing your unit leader within friendly territory. \
Then your remaining miniatures are placed in cohesion with your leader unit and within friendly territory.\
Miniatures cannot overlap impassable terrain when they are placed using Infiltrate.",
  "Inspire": "At the end of your activation, remove up to X total suppression tokens from other friendly units at range 2.",
  "Interrogate": "During the Command Phase if a player reveals a Command Card that belongs to a unit at/within range 1 \
of one or more enemy units with the Interrogate keyword and there would be a tie for priority, treat that command card as having one more pip.",
  "Jar'Kai Mastery": "While preforming a melee attack, after converting attack surges, you may spend any number of dodge tokens. \
For each dodge token spent in this way change a blank result to a hit, a hit result to a crit, or spend 2 dodges tokens \
to change a blank result to a crit.",
  "Jedi Hunter": "While attacking a unit that has a Force upgrade icon, you gain surge to crit.",
  "Jump": "Perform a move during which you ignore terrain that is height X or lower, measuring height from your starting position. This is treated as a move action.",
  "Juyo Mastery": "While have 1 or more wound tokens, you can perform 1 additional action during your activation. Limit 2 move actions.",
  "Latent Power": "At the end of your activation, you may gain 1 suppression token to roll 1 red defense die.\n\n\
On a focus result, choose an enemy unit at range 1 to give 2 suppression tokens and 2 immobilize tokens.\n\n\
On a blank result, remove 1 wound or 1 poison token from a friendly non-droid trooper at range 1.",
  "Loadout": "During Army Building, for each Upgrade Card equipped to you, you may choose another eligible Upgrade Card \
of the same type with an equal or lesser point cost and set it aside.\n\n\
During Setup, a unit with the Loadout keyword may swap any number of its equipped Upgrade Cards with the matching \
set-aside Upgrade Cards one for one. \n\n\
When swapping Upgrade Cards, a unit cannot have two or more upgrades with the same name equipped. \
If two or more units with the Loadout keyword are in the same army, keep their respective set-aside Upgrade Cards separate.\
Each unit can swap Upgrade Cards only with their own set-aside cards; they cannot share set-aside Upgrade Cards.\n\n\
A Counterpart Card that is added to a unit with the Loadout keyword also benefits from the Loadout ability.",
  "Low Profile": "While defending against a ranged attack if you would roll one or more defense dice during the \
Roll Cover Pool step, roll one fewer defense die and instead add one additional block result to the cover pool after rolling.",
  "Makashi Mastery": "While performing a melee attack, during the CHoose Weapons and Gather Dice step, you may reduce the \
PIERCE value of a weapon in the attack pool by 1. If you do, the defender cannot use IMMUNE: PIERCE or IMPERVIOUS.",
  "Marksman": "After converting attack surges, you can spend any nunber of aim tokens. For each token spent, convert a \
blank to a hit, a hit to a crit, or spend 2 tokens to convert a blank to a crit.",
  "Master of the Force": "At the end of its activation, this unit may ready up to X of its exhausted Force upgrade cards.",
  "Master Storyteller": "When a unit performs the Master Storyteller card action, it chooses up to X friendly Ewok units at range 2, \
where X is the current round number.  Each chosen unit gains 2 surge tokens.",
  "Mercenary": "A unit with the Mercenary keyword is a Mercnary unit. The faction(s) specified by the Mercenary keyword\
can include that unit in an army as a Mercenary unit.",
  "Nimble": "After defending, if you spent 1 or more dodge tokens, gain 1 dodge token.",
  "Observe": "Choose an enemy unit at range 3 and in LOS. It gains X Observation Tokens.",
  "Observation Token": "During an attack, a friendly attacking unit can spend any number of observation tokens on \
the defending unit during the Reroll Attack Dice step. The attacking unit rerolls one attack die for each observation \
token spent. Observation tokens are spent one at a time, and the same die can be rerolled by spending subsequent observation or aim tokens. \
The attacking unit may spend observation and aim tokens in any order.",
  "One Step Ahead": "If 1 or more allied units have the One Step Ahead keyword, \
during the Resolve Command Card Effects step, after revealing \
Command Cards but before resolving Command Card effects, \
if the number of pips on the revealed Command Cards do not \
match, 1 allied unit with the One Step Ahead keyword on the \
battlefield may make a Speed-1 Move. If the number of pips do \
match, and there is 1 or more allied units with the One Step \
Ahead keyword on the battlefield, choose an allied unit on the \
battlefield. The chosen unit may make a Speed-1 Move.",
  "Outmaneuver": "During the Apply Dodge and Cover step, you can spend dodge tokens to cancel crit results.",
  "Override": "When a friendly unit begins its activation at range 5 of a unit that has the Override keyword, \
it may gain 1 suppression token. If it does, the activating unit ignores AI during its activation.",
  "Plodding": "During your activation, you can perform only 1 move action.",
  "Precise": "When you spend an aim token during the Reroll Attack Dice step, reroll up to X additional dice.",
  "Prepared Position": " During the Deploy in Prepared Positions step of setup, you may deploy by placing the unit leader of that unit within friendly territory. \
Then the remaining minatures in that unit are placed in cohesion with their unit leader and within friendly territory. That unit then gains 1 dodge token.\
Minis cannoot overlap impassable terrain when they are placed using Prepared Position.",
  "Programmed": "During Army Building, you must equip at least 1 Protocol upgrade",
  "Pulling the Strings": "Choose a friendly trooper unit at range 2. That unit may perform a free attack action or a free move action.",
  "Quick Thinking": "As an action, gain 1 aim token and 1 dodge token.",
  "Ready": "After you perform a standby action, gain X aim tokens.",
  "Recharge": "When you recover, flip up to X inactive shield tokens to their active side.",
  "Regenerate": "At the end of your activation, roll 1 white defense die for each wound token you have, up to X. For each surge or block result, remove 1 wound token.",
  "Reinforcements": "At the start of the End Phase of the first round of a game, you may perform a free speed-1 move.",
  "Relentless": "After you perform a move action during your activation, you may perform 1 free attack action.",
  "Reliable": "At the start of the Activation Phase, you gain X surge tokens.",
  "Reposition": "Either before or after you perform a standard move, you may perform a free pivot action.",
  "Restore": "Choose a unit, then select a mini from this unit defeated in the current round. Place that mini in cohesion with its unit leader, then give it wound tokens equal to one less than its wound threshold",
  "Retinue": "At the start of the Activation Phase, if you are at range 2 of X, gain 1 aim or dodge token. Additionally, a unit with Retinue keyword ignores the core rank requirments to provide backup to the specified unit.",
  "Ruthless": "When another friendly Corps trooper unit at range 2 and in LOS that has a faceup order token activates, it may suffer 1 wound to perform 1 free action.",
  "Sidearm Melee/Ranged": "If an upgrade has Sidearm:Melee keyword, the minatirue added by that upgraad or with that upgrade cannot add any melee weapons to attack pools other than any melee weapons on the Upgrade Card with Sidearm: Melee.  (Same effect for ranged)",
  "Scale": "When you perform a climb, you may move a vertical distance of up to height 2. Do not reduce maximum speed when moving through difficult terrain.",
  "Scatter": "After performing an attack against a trooper unit with small bases, you may move any non-leader minis in the defending unit, following the all the rules of cohesion, as if the unit leader had performed a standard move.",
  "Scout": "At the start of its Perform Actions step, it may deploy by performing a free speed X move action, ignoring difficult terrain. A unit can perform this move regardless of its maximum speed. The Scout X keyword is cumulative, but cannot exceed 3. If a unit would ever have Scout X eceeding Scout 3, it has Scout 3 instead.",
  "Scouting Party": "During Setup, a unit with Scouting Party keyword may choose up to X friendly trooper units that share the same faction or affiliation with that unit and do not have the scout keyword. Each chosen unit gains the Scout X keyword this game, where X is the Scout X value of the uint with the Scouting Pary keyword.",
  "Secret Mission": "Once per game if a unit with the Secret Mission keyword is within enemy territory, it gains a secret mission token. When scoring VP, if a player with 1 or more secret mission tokens is within enemy territory that unit scores 1 VP. Then, remove those secret mission tokens from the game.",
  "Self-Destruct": "A unit may make a Self-Destruct X Card action only if it has \
a number of Wound tokens equal to or greater than half of its \
Wound threshold, rounding up. For each unit within {1} and in \
LOS, roll X black attack dice, completely resolving each roll before \
moving to the next unit. That unit suffers 1 Wound for each SURGE and \
CRIT result rolled, then gains 1 Suppression token for each HIT result \
rolled. After all rolls are resolved, this unit is defeated.",
  "Self-Preservation": "When checking for panic, this unit cannot use the courage value of of units not of the same affiliation.",
  "Sentinel": "Your standby range is 1-3.",
  "Sharpshooter": "While performing a ranged attack, reduce the defender's cover by X.",
  "Shield Token": "While defending against a ranged attack, during the Apply Dodge and Cover step, a unit may flip any number of active shield tokens. For each shield token flipped this way, the defender cancels 1 hit or crit result.",
  "Shielded": "You have X shield tokens",
  "Sidearm": "While performing an attack, this mini can only use the weapon on this upgrade card if the attack type matches X.",
  "Recon": "Intended for use in Recon matches.",
  "Small": "A unit that has 1 or more Counterpart miniatures with the \
Small keyword cannot be targeted with attacks if the attacking \
unit leader only has LOS to the Counterpart miniature with the \
Small keyword",
  "Smoke": "Place X smoke token(s) within range 1 and in LOS of your unit leader.",
  "Soresu Mastery": "While defending agains a ranged attack, it may reroll all of its defense dice during the Reroll Defense Dice step. Additionally, when using the Guardian X keyword, it may spend one dodge token before converitng any surges. If it does, it rerolls all of its defense dice before converting surges. Each die cannot be rerolled more than once.",
  "Special Issue": "This unit may only be included in X battleforce",
  "Speeder": "While moving, ignore terrain that is height X or lower. When at the start or end of your activation, you must perform a free compulsory move. Additionally, a notched based unit perfroms a move, it skips step 1 of notched base movement, rotating the unit leader's base. If a unit performs more than one non-compulsory move actions, it may not claim asset tokens that activation.  Additionally, a unit that has claimed an asset token can perform only one non-compulsory move actions during its activation.",
  "Spotter": "Choose X friendly units at range 2. Each unit gains an aim token.",
  "Spray": "Add this weapon's dice to the attack pool one time for each mini in the defending unit to which LOS is not blocked.",
  "Spur": "While performing a move, you may gain 1 suppression token to increase your maximum speed by 1.",
  "Stationary": "You cannot perform moves, except pivots.",
  "Steady": "After you perform a move action during your activation, you may perform a free ranged attack action.",
  "Strategize": "Gain 1 suppression token and choose X friendly units at range 2. The chosen units each gain 1 aim and 1 dodge token.",
  "Suppressive": "After you perform an attack, the defender that this weapon was used against gains 1 suppression token.",
  "Surge Token": "Spending one or more surge tokens will convert the same number of surges to blocks while defending or using using GUARDIAN, and to hits while attacking.",
  "Tactical": "After you perform a standard move, gain X aim tokens.",
  "Take Cover": "Choose X friendly trooper units at range 2. Each unit gains a dodge token.",
  "Target": "After you are issued an order, gain X aim tokens.",
  "Teamwork": "While you are at range 2 of X, when you or X gains an aim or dodge token, the other unit gains a token of the same type.",
  "Tempted": "If a friendly unit is defeated by an enemy attack and the attacking unit is at range 3 of a unit with the Tempted keyword, after the attack is resolved, that unit with the Tempted keyword may perform a free attack action or a speed-2 move ignoring difficult terrain. A unit may use the Tempted keyword only once each round.",
  "Tow Cable": "After a Vehicle suffers 1 or more Wounds from an attack that \
has Tow Cable in the Attack Pool, the attacking player makes a \
Pivot with that Vehicle, then it gains 1 Immobilize token.",
  "Transport": "During Setup you may choose a friendly core trooper or special forces trooper unit to transport. During the Issue Order step of the Command Phase of round1, a unit with Transport may issue an order to the chosen unit. If the chosen unit is undeployed when the Transport unit deploys, after the effect is resloved the chosen unit deploys by preforming a speed 1 move. Measure the start with both prongs of the movement tool touching the base of the Transport.",
  "Treat": "Choose a friendly non-droid trooper unit at range 1 and in LOS and place a wound token on this card. Remove up to X wound or poison tokens from that unit or restore up to X miniatures to that unit. You cannot use this ability if this card has Y or more wound tokens. If you have multiple TREAT keywords, treat them as separate abilities.",
  "Uncanny Luck": "While defending, you may reroll up to X defense dice. All dice must be rerolled at once, no die can be rerolled twice.",
  "Unconcerned": "You cannot benefit from cover, minis in this unit cannot be repaired or restored.",
  "Unhindered": "You ignore the effects of difficult terrain.",
  "Unstoppable": "This unit is eligible to activate while it has one or fewer facedown order tokens. This unit may never have more than one faceup order token. While this unit is not defeated, when creating its order pool, its controlling player adds an additional order token for this unit to the order pool",
  "Vehicle": "You can:  pivot, block LOS. Ground vehicles can:  reverse, move through repulsor vehicles, perform the standby action, obscure other minis and provide cover. Repulsor vehicles:  can move through troopers and vehicles.",
  "Versatile": "You can perform ranged attacks using this weapon while engaged.",
  "Weak Point": "While defending, if the attacker's unit leader is inside the listed arc(s), the attack pool gains IMPACT X.",
  "Weighed Down": "While a unit has a claimed objective token, it cannot use the Jump keyword",
  "We're Not Regs": "Unit may not spend green tokens on other Clone Troopers and other Clone Trooper units may not spend this unit's green tokens.  Additionally, this unit cannot benefit from backup.",
  "Wheel Mode": "At the start of your activation, as a free action, you may increase your maximum speed to 3. If you do, until the end of the round, you gain COVER 2 and cannot attack or flip active shield tokens.",
  "Wound": "The first time you enter play, you suffer X wounds.",


  "Authoritative": "Once per Command Phase, when you would be issued an order, you may instead issue an order to a friendly unit at range 1-2",

  "Area Weapon": "When using this weapon, perform a separate ranged attack against each friendly and enemy unit within LOS and this weapon's range, even if that unit is engaged. Area Weapon is indicated by a yellow range icon.",
  "Arm": "Place X of the specified charge tokens within range 1 and in LOS of your unit leader. Charge tokens cannot overlap objective, condition, or other charge tokens and must be placed on a flat surface.",
  "Bane Token": "Bane tokens (\"Here I Am\", \"Smoke and Mirrors\", \"Kablamo!\") are placed facedown, they cannot overlap objective or condition tokens. When an enemy mini moves, deploys, or is placed at Range 1 with LOS to the token, the token is revealed, its effect is resolved, then the token is removed. Minis cannot overlap Bane tokens.",
  "Kablamo!": "This token detonates using the weapon on Cad Bane's \"I Make the Rules Now\" Command Card.",
  "Smoke and Mirrors": "No effect.",
  "Here I Am": "If Cad Bane is not defeated, replace this token with him. If he was not already on the battlefield, he issues himself an order. At the start of each round, a player may reveal a friendly \"Here I Am\" token and resolve it.\n",
  "Beam": "During the Declare Additional Defender step, you may choose up to X different targets using only this weapon. Additional targets must be against an enemy unit that is in LOS and within range 1 of the last defending unit declared. These additional attacks do not generate further attacks. Additional targets may be beyond this weapon's range.",
  "Blast": "Ignore cover.",
  "Critical": "While converting attack surges, you may convert up to X surge results to critical results.",
  "Cumbersome": "You cannot move prior to attacking with this weapon, unless the move is a pivot.",
  "Cycle": "At the end of your activation, if you did not use this card, ready it.",
  "Detonate": "After a unit controlled by any player performs an action, you may detonate up to X of the specified friendly charge tokens. See Rulebook.",
  "Divulge": "You may reveal this card at the phase or step indicated. If you do, resolve its DIVULGE effect then return it to your hand.",
  "Fixed": "To add this weapon to the attack pool, the defender must have at least 1 mini partially inside the specified arc.",
  "Graffiti Token": "During the Rally step of a friendly unit's activation:  if it has LOS to a friendly graffiti token at range 1-2, it may roll 1 additional die; if it has LOS to an enemy graffiti token at range 1-2, it must roll 1 fewer die, to a minimum of 1.",
  "Grounded": "You cannot climb.",
  "High Velocity": "While attacking, if each weapon in your attack pool has HIGH VELOCITY, the defender cannot spend dodge tokens.",
  "Immobilize": "A unit suffering 1 or more wounds from an attack pool with this weapon gains X immobilize tokens. Reduce a unit's max speed by 1 per immobilize token. A unit with max speed 0 and one or more immobilize tokens cannot perform moves of any kind. Remove all of a unit's immobilize tokens at the end of its activation.",
  "Impact": "While attacking a unit that has ARMOR, change up to X hit results to crit results.",
  "Ion": "A vehicle or droid wounded by an attack that included this weapon gains X ion tokens. At the start of the Modify Attack Dice step, before any other effects, any unit defending against this weapon must flip an active shield token, if able, for each hit or critical result, up to X.",
  "Ion Token": "At the start of a unit's activation, if it has 1 or more ion tokens, roll one white defense die for every ion token that unit has. If any blank results are rolled, that unit performs one fewer action during its activation.",
  "Leader": "This mini is your unit leader. Limit 1 LEADER per unit.",
  "Lethal": "You may spend up to X aim tokens during the Modify Attack Dice step. If you do, the attack pool gains Pierce 1 for each aim token spent.",
  "Long Shot": "While attacking, spend up to X aim tokens to increase this weapon's maximum range by 1 for each aim token spent.",
  "Noncombatant": "This mini cannot use any weapons and wounds must be assigned to other non-unit leader minis first.",
  "Overrun": "A unit may make X overrun attacks during its activation. A unit can perform an overrun attack after it makes a standard move during which one of its minis bases overlapped an enemy mini's base. After completing the move and resolving any displacement of the enemy unit, perform an attack against the unit you moved through, ignoring range. You can form only one attack pool, using only OVERRUN weapons and only adding the overrun weapon once, even if multiple minis are in the attack. If a unit has OVERRUN greater than 1, it must perform a separate move for each overrun attack.",
  "Permanent": "This card is not discarded at the End Phase, its effect persists as long as it's in play.",
  "Pierce": "While attacking, cancel up to X block results.",
  "Poison": "A non-droid trooper unit suffering wounds from this weapon gains X poison tokens.",
  "Poison Token": "At the end of a unit's activation, it suffers 1 wound for each poison token it has, then discards each poison token it has. Vehicles and droid trooper units cannot gain poison tokens.",
  "Ram": "During the Modify Attack Dice step, you may change X attack die results to crit results if you performed at least 1 full standard move at max speed during the same activation as this attack.",
  "Reconfigure": "When you recover, you may flip this card. Reconfigure does not exhaust this card.",
  "Repair": "Choose a friendly droid trooper or vehicle unit at range 1 and in LOS. Place 1 wound token on this card to remove up to X wound, ion, or vehicle damage tokens from the chosen unit, or to RESTORE X minis to that unit. You cannot do this action if this card has Y wound tokens. If you have multiple Repairs, treat each as a separate ability.",


}

export default keywords;