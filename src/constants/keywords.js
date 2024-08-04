const keywords = {
	"Compulsory Move":{
			"summary":"",
			"full":"A compulsory move is a free move action. \
				To perform a compulsory move, the unit performs a full move at its maximum speed. \
				If it cannot do so, or if a full move would cause any part of the unit leader’s base  \
				to be outside the battleﬁeld, it can perform a partial move instead, ending its \
				movement as far along the movement template as possible."
	},
	"Advanced Targeting":{ 
		"full":	"When a unit with the Advanced Targeting X keyword performs \
an attack against an enemy unit with the unit type listed, during \
the Form Attack Pool step, it may gain X aim tokens. A unit that \
uses the Advanced Targeting X keyword may only form one \
attack pool and skips the Declare Additional Defender step of \
the attack sequence."
	},
	"Agile":{
		"summary":"",
		"full":"The Agile X keyword allows a unit to gain a number of dodge \
tokens equal to X each time it performs a standard move as part \
of an action or free action."
	},
	"AI":{
		"summary":"",
		"full":"At the start of a unit with the AI keyword’s Perform Actions \
step, if it is on the battleﬁeld, does not have a faceup order \
token, and is not at range 3 of a friendly p unit, it must perform \
one of the speciﬁed actions as its ﬁrst action that activation. \
Free actions do not satisfy the requirements of the AI keyword. \
If a unit cannot perform any of its listed actions as its ﬁrst \
action, it is free to perform other actions as normal."
	},
	"Aid":{
		"summary":"",
		"full":"When a unit with the Aid keyword would gain an aim, \
dodge, or surge token, another friendly unit of the aﬃliation \
or type listed at range  2 and in line of sight may gain that token \
instead. If it does, the unit with the Aid keyword gains one \
suppression token."
	},
	"Allies of Convenience":{
		"summary":"",
		"full":"Units with the Allies of Convenience keyword may issue \
orders to friendly Mercenary units regardless of aﬃliation. \
Additionally, when building an army, players may include one \
extra Mercenary unit in their army regardless of rank if there \
is at least one unit with the Allies of Convenience keyword, \
though they cannot take more units of a particular rank than \
normally allowed."
	},
	"Area Weapon":{
		"summary":"",
		"full":"A weapon with a yellow range icon 1 is an area weapon. When \
using an area weapon, perform a separate attack against each \
unit, friendly and enemy, that is in LOS and at the range indicated \
by the number on the range icon, even if that unit is engaged. \
Attacks made by area weapons are always ranged attacks. \
Area weapons can never be in an attack pool made by a unit \
and must always be the only weapon in an attack pool."
	},
	"Arm":{
		"summary":"",
		"full":"A unit that is equipped with a card that has the Arm X: Charge \
Token Type keyword can perform the Arm X action. When a \
unit performs the Arm X action, the unit places X charge tokens \
of the speciﬁed type and matching its controlling player’s color \
within 1 and LOS of its unit leader. \
Charge tokens cannot overlap any objective, advantage, or other \
charge tokens and must be placed on a ﬂat surface completely \
ﬂush with that surface."
	},
	"Armor":{
		"summary":"",
		"full":"During the Modify Attack Dice step of the attack sequence, if \
the defending unit has the Armor X keyword, the defending \
player may cancel up to X hit a results, removing those dice \
from the attack pool."
	},
	"Arsenal":{
		"summary":"",
		"full":"When choosing weapons during the Form Attack Pool step, \
each miniature in the unit that has the Arsenal X keyword \
can contribute X weapons to attack pools. Each weapon or \
combination of weapons may form a new attack pool, but each \
weapon may only be added to one attack pool."
	},
	"Associate":{
		"full":"During Army Building, a unit with the Associate keyword does \
not count its rank towards the maximum rank requirements for \
that rank if a unit with the speciﬁed unit name is included in \
the same army."
	},
	"Ataru Mastery":{
		"summary":"",
		"full":"A unit with the Ataru Mastery keyword can perform up to two \
attack actions during its activation. When it attacks, it gains \
one dodge token after the attack is resolved. When it defends, it \
gains one aim token after the attack is resolved."
	},
	"Attack Run":{
		"full":"At the start of its activation, a unit with the Attack Run keyword \
may increase or decrease its maximum speed by 1 until the end \
of that activation."
	},
	"Authoritative":{
		"summary":"",
		"full":"When a unit with the authoritative keyword would be issued an order, that unit may issue an order to a friendly unit at range 1–2 instead."
	},
	"Bane Token":{
		"summary":"",
		"full":"Cad Bane has a set of three unique Bane tokens that he can \
place on the battleﬁeld. Bane tokens are double-sided, with \
a uniform back and three different images on the front, each \
linked to a unique effect. \
Bane tokens must be placed facedown on the battleﬁeld and \
cannot overlap objective or advantage tokens. Bane tokens are \
enemy effects. Each player may only have one copy of each \
different Bane token on the battleﬁeld at the same time. \
When an enemy miniature moves, deploys, or is placed at range 1 \
of an enemy Bane token, if that miniature has LOS to the token, \
it is revealed. Miniatures can move through but not overlap \
Bane tokens. When a Bane token is revealed, it has one of the \
following effects (Here I Am, Smoke and Mirrors, or Kablamo!):"
	},
	"Kablamo!":{
		"summary":"",
		"full":"The token detonates using the weapon proﬁle on \
Cad Bane’s I Make the Rules Now Command Card, then the \
token is removed."
	},
	"Smoke and Mirrors":{
		"summary":"",
		"full":"The token is removed."
	},
	"Here I Am":{
		"summary":"",
		"full":"If Cad Bane is not on the battleﬁeld and is not \
defeated, his Here I Am token is replaced by his miniature. \
Then, Cad Bane issues himself an order. \n \
If Cad Bane is on the battleﬁeld, his Here I Am token is \
replaced by his miniature. Any tokens assigned to Cad Bane \
remain assigned to him. \n \
• If Cad Bane is defeated, the token is removed. \n \
• At the start of each round, starting with the blue player, a \
player may reveal a friendly Here I Am token and resolve it."
	},
	"Barrage":{
		"summary":"",
		"full":"If a unit has the Barrage keyword, it may make two attack \
actions instead of one if it does not use the Arsenal keyword \
during its activation."
	},
	"Beam":{
		"summary":"",
		"full":"During the Declare Additional Defender step, if a weapon \
with the Beam X keyword is in a unit’s attack pool, that unit \
may declare up to X additional attacks forming attack pools \
using only the weapon with the Beam X keyword, even though \
the weapon has already been added to an attack pool. These \
additional attacks do not generate further attacks. \
Each additional attack must be against a different defending \
unit that is at range 1 of the last defending unit declared. These \
additional attacks must be in LOS of the attacking unit but \
may be beyond the maximum range of the weapon with the \
Beam X keyword. \
Units may not use the Beam X and Gunslinger keywords during \
the same attack."
	},
	"Blast":{
		"summary":"",
		"full":"During the Apply Cover step, a defending unit cannot use light \
or heavy cover to cancel hit a results produced by an attack pool \
that contains dice added by a weapon with the Blast keyword."
	},
	"Block":{
		"summary":"",
		"full":"When a unit with the Block keyword is defending, if it spends \
any dodge tokens during the Apply Dodge and Cover step, it \
gains surge:block."
	},
	"Bolster":{
		"summary":"",
		"full":"As a card action, a unit with the Bolster X keyword can choose \
up to X friendly units at range 2 to each gain one surge token."
	},
	"Bounty":{
		"summary":"",
		"full":"During Setup, a unit with the Bounty keyword chooses an \
enemy o or p unit. The chosen unit gains a bounty token. \
After a friendly unit with the Bounty keyword defeats an enemy \
unit that has one or more bounty tokens with an attack or effect, \
the friendly unit’s controlling player scores 1 VP."
	},
	"Cache":{
		"summary":"",
		"full":"During Setup, a unit with an equipped Upgrade Card that has \
the Cache keyword places the listed token(s) on the card with \
the Cache keyword. The unit may spend those tokens."
	},
	"Calculate Odds":{
		"summary":"",
		"full":"As a card action, a unit with the Calculate Odds keyword can \
choose a friendly trooper unit at range 2 and in LOS to gain one aim \
token, one dodge token, and one suppression token."
	},
	"Charge":{
		"summary":"",
		"full":"After a unit that has the Charge keyword performs a move \
action that brings it into base contact with an enemy miniature \
to start a melee, it may perform a free attack action against that \
unit using only melee weapons."
	},
	"Climbing Vehicle":{
		"summary":"",
		"full":"A unit with the Climbing Vehicle keyword is treated as a \
trooper unit for the purposes of climbing."
	},
	"Compel":{
		"summary":"",
		"full":"After another trooper unit at range 2 of a friendly unit with the \
Compel keyword performs its Rally step and is suppressed but \
not panicked, at the beginning of its Perform Action step, it may \
gain one suppression token to perform a free move action."
	},
	"Complete the Mission":{
		"full":"During Setup, for each friendly unit with the Complete the \
Mission keyword, place a friendly priority mission token on the \
battleﬁeld within contested territory. \
While a unit with the Complete the Mission keyword is at range 1 \
of one or more friendly priority mission tokens, that unit gains \
e:d. When a unit with the Complete the Mission keyword \
attacks an enemy unit at range 1 of one or more friendly priority \
mission tokens, the attacking unit’s attack pool gains the Critical \
2 keyword."
	},
	"Contingencies":{
		"summary":"",
		"full":"When building a command hand before the game begins, \
for each unit with the Contingencies X keyword in a player’s \
army, that player sets aside up to X additional Command \
Cards facedown as Contingency Cards, where X is equal to \
the combined Contingencies X value on all their units. These \
set-aside cards may have any number of pips but must follow \
all other rules for constructing a command hand. Set-aside \
Contingency Cards are not considered to be in a player’s \
command hand and are kept secret from an opponent. A player \
may look at their set-aside Contingency Cards at any time. \
After a player reveals a Command Card, before any other effects \
are resolved, that player may discard that card to reveal one of \
their set-aside Contingency Cards with an equal number of pips \
instead. The revealed Contingency Card is then treated as that \
player’s selected and revealed Command Card for that turn. If \
both players have set-aside Contingency Cards, the blue player \
must decide ﬁrst whether or not to reveal a Contingency Card. \
If all a player’s units with the Contingencies X keyword are \
defeated, a player cannot reveal or use their Contingency Cards."
	},
	"Coordinate":{
		"summary":"",
		"full":"After a unit with the Coordinate keyword is issued an order, \
it may issue an order to a friendly unit at range 1 that has the \
unit name or unit type speciﬁed. A unit that has one or more \
unit names or unit types listed can only choose one of these \
listed unit names or unit types to issue an order to using the \
Coordinate keyword. If a unit already has the Coordinate \
keyword and gains another instance of the keyword, the unit \
may choose which targets to issue an order to from the two \
instances of the keyword; it does not issue two orders."
	},
	"Counterpart":{
		"summary":"",
		"full":"Some units are faithful companions or subservient minions and \
are almost never seen apart from another unit. A unit like this \
has the Counterpart keyword and the miniature that represents \
this unit is always added to another unit. That miniature \
has a Counterpart Card and their miniature is a counterpart \
miniature. The combined unit has the rank, unit type, defense \
die, courage value, surge conversion chart, and speed as shown \
on the Unit Card. \
• Sometimes, a Counterpart Card has a different unit type \
only for the purposes of equipping Upgrade Cards. \
• A unit leader in a combined unit can be assigned wounds \
when it is the only non-counterpart miniature in the unit. \
• When a wound token would be assigned to a non- \
counterpart miniature in a combined unit, that unit’s \
controlling player may assign that wound token to an \
undefeated counterpart miniature in that unit instead. That \
wound token must be assigned to a counterpart miniature \
if it would cause the last non-counterpart miniature in the \
unit to be defeated. \
• Upgrade Cards without weapons equipped to a counterpart \
miniature are usable by the rest of the unit, unless the \
counterpart miniature is defeated. \
• Upgrade Cards with weapons are usable only by the \
miniature which has them equipped. \
• The non-counterpart miniatures in the unit use the wound \
threshold on their Unit or Upgrade Card, the counterpart \
miniature uses the wound threshold on the Counterpart \
Card. \
• The combined unit has the keywords on both the Unit Card \
and the Counterpart Card. \
• Miniatures in a combined unit may only use weapons that \
are on their respective cards. If a combined unit gains a \
weapon from a Command Card, only the non-counterpart \
miniature may use it. \
• If the counterpart miniature is defeated, the unit loses any \
keywords, abilities, or effects on the Counterpart Card."
	},
	"Cover":{
		"summary":"",
		"full":"If a unit has the Cover X keyword and is defending against an \
attack with at least one ranged weapon, during the Apply Dodge \
and Cover step, it improves the numerical value of its cover by a \
number equal to X."
	},
	"Covert Ops":{
		"summary":"",
		"full":"During Setup, a unit with the Covert Ops keyword may change \
its rank to o for all rules purposes for the rest of the game. If \
it does, it gains the Inﬁltrate keyword that game. A unit cannot \
change its rank to o if there are no other p units in that \
player’s army."
	},
	"Creature Trooper":{
		"summary":"",
		"full":""
	},
	"Critical":{
		"summary":"",
		"full":"When a unit converts attack surges for an attack pool with \
the Critical X keyword, during the Convert Surges step it may \
convert up to X attack surge c results to critical b results."
	},
	"Cumbersome":{
		"summary":"",
		"full":"A unit that has a weapon with the Cumbersome keyword \
cannot perform a move prior to performing an attack using that \
weapon during the same activation unless the move is a pivot."
	},
	"Cunning":{
		"summary":"",
		"full":"During the Command Phase, if a player reveals a p or \
o speciﬁc Command Card that belongs to a unit with the \
Cunning keyword and there would be a tie for priority, treat \
that Command Card as having one fewer pip. If both players \
reveal a speciﬁc p or o Command Card that belongs to a \
unit with the Cunning keyword, there is still a tie for priority."
	},
	"Cycle":{
		"summary":"",
		"full":"At the end of a unit’s activation, ready each of its exhausted \
Upgrade Cards with the Cycle keyword that was not used \
during that activation. Only using the weapon, keywords, or \
other card text on the card counts as using that Upgrade Card."
	},
	"Danger Sense":{
		"summary":"",
		"full":"When a unit with the Danger Sense X keyword would remove \
any number of its suppression tokens, it may choose to not \
remove up to X tokens, including zero. \
While a unit with the Danger Sense X keyword is defending \
against an attack, it rolls one extra defense die during the Roll \
Defense Dice step for every suppression token it has, up to X \
additional dice."
	},
	"Dauntless":{
		"summary":"",
		"full":"After a unit with the Dauntless keyword performs its Rally \
step and is suppressed but not panicked, at the beginning of \
its Perform Action step, it may gain one suppression token to \
perform a free move action. \
A unit with the Dauntless keyword may not be affected by the \
Compel keyword."
	},
	"Death from Above":{
		"full":"When a unit with the Death From Above keyword attacks, \
the defending unit cannot use cover to cancel hit a results \
during the Apply Cover step if the attacking unit's unit leader \
is overlapping a piece of non-area terrain of greater height than \
any terrain the defending unit's unit leader is overlapping."
	},
	"Defend":{
		"summary":"",
		"full":"After a unit with the Defend X keyword is issued an order, it \
gains X dodge tokens."
	},
	"Deflect":{
		"summary":"",
		"full":"While a unit with the Deﬂect keyword is defending against \
a ranged attack or using the Guardian X keyword, its surge \
conversion chart gains e:d. Additionally, during the Convert \
Defense Surges step before converting e results, the attacker \
suffers one wound if there is at least one e result in the \
defense roll. \
If the Deﬂect keyword causes the attacking unit to be defeated, \
the attack continues, and the defender can still suffer wounds. \
While defending or using the Guardian X keyword against \
an attack in which weapons with the High Velocity weapon \
keyword are the only weapons in an attack pool, the Deﬂect \
keyword has no effect."
	},
	"Demoralize":{
		"summary":"",
		"full":"After a unit with the Demoralize X keyword performs its Rally \
step, add up to X total suppression tokens to enemy units at range 2."
	},
	"Detachment":{
		"summary":"",
		"full":"During Army Building, a unit with the Detachment keyword \
doesn’t count against the maximum number of units of its rank \
that can be included. A unit with the Detachment keyword \
can be included in a player’s army only if another unit that \
has the unit name or unit type specified and does not have the \
Detachment keyword is also included in that army. Each unit \
with the Detachment keyword needs its own matching specified \
unit. Additionally, during the Deploy in Prepared Positions \
step, a unit with the Detachment keyword gains the Infiltrate or \
Prepared Position keyword for the remainder of the game if its \
matching specified unit has that keyword. \n \
For example, a player wishes to add a DF-90 Mortar Trooper \
to their army. Because the DF-90 Mortar Trooper has the \
Detachment: Shoretroopers keyword, the player must ﬁrst add \
a unit of Shoretroopers to their army before adding the DF-90 \
Mortar Trooper. The player does so, and the army now contains \
a Shoretroopers unit and a DF-90 Mortar Trooper unit. The \
player then wishes to add a second DF-90 Mortar Trooper unit \
to their army, and therefore must ﬁrst select a second unit of \
Shoretroopers to include in their army."
	},
	"Detonate":{
		"summary":"",
		"full":"After a unit controlled by any player attacks, moves, or performs \
an action, each unit that has a weapon with the Detonate X \
keyword may detonate up to X friendly charge tokens of the \
speciﬁed type. If a token would detonate, that token detonates \
before any other abilities or effects that occur after a unit moves \
or performs an action, with the exception of spending a standby \
token which can be spent by a unit before the token detonates. \
If both players have units that could detonate charge tokens, \
the player that does not control the unit that just performed \
the attack, move, or action may use their unit’s Detonate X \
keyword ﬁrst. \
When a token detonates, perform a separate attack against each \
unit, friendly and enemy, that has LOS to the token and is in \
range of the area weapon, using the surge conversion chart and \
weapon keywords on the card for the token being detonated. The \
detonating token is considered the attacking unit when making \
attacks, meaning that it cannot spend aim tokens or modify \
attack dice, regardless of any abilities on the unit that placed the \
token. After a token detonates, remove it from the battleﬁeld."
	},
	"Direct":{
		"summary":"",
		"full":"Each Command Phase, during the Issue Orders step, a unit with \
the Direct keyword may issue an order to a friendly unit at range 2 \
that has the unit name or unit type speciﬁed."
	},
	"Disciplined":{
		"summary":"",
		"full":"After a unit with the Disciplined X keyword is issued an order, \
it may remove up to X suppression tokens."
	},
	"Disengage":{
		"summary":"",
		"full":"While a trooper unit with the Disengage keyword is engaged \
with a single enemy unit, it can still perform moves as normal."
	},
	"Distract":{
		"summary":"",
		"full":"As a free card action, a unit with the Distract keyword can choose \
an enemy trooper unit at range 2 and in LOS. Until the end of the \
round, when the chosen enemy unit performs an attack, it must \
attack the unit that used the Distract action, if able. \
While the chosen enemy unit is attacking the unit with the \
Distract keyword, each miniature in the enemy unit must choose \
an eligible weapon to contribute to an attack pool. The enemy \
unit may only declare additional defenders and form additional \
dice pools if, after ﬁrst forming a dice pool with eligible weapons, \
there are still weapons usable by miniatures in the unit that were \
not eligible to be added to the ﬁrst attack pool. \
When a unit uses the Distract keyword, if it had the \
Inconspicuous keyword, it loses it until the end of the round."
	},
	"Divine Influence":{
		"full":"While they are at range 1 of a friendly C-3PO, friendly  trooper \
units gain Guardian 2: C-3PO. While using Guardian, they may \
cancel b results as if they were a results. \
DAUNTLESS (UNIT KEYWORD) \
After a unit with the Dauntless keyword performs its Rally \
step and is suppressed but not panicked, at the beginning of \
its Perform Action step, it may gain one suppression token to \
perform a free move action. \
A unit with the Dauntless keyword may not be affected by the \
Compel keyword."
	},
	"Divulge":{
		"summary":"",
		"full":"Some Command Cards have the Divulge keyword. Command \
Cards that contain the Divulge keyword are divided by a \
horizontal line, which serves to visually separate the Divulge \
keyword effect from the normal Command Card effect. Some \
Divulge cards have multiple options, in this case the player must \
pick one. These cards can be revealed at the start of the phase or \
step indicated by the Divulge keyword. If a card is revealed in \
this manner, resolve the text that follows the Divulge keyword. \
A card that is revealed in this way is not played and is returned \
to that player’s command hand at the end of the step in which \
it was divulged. Players can divulge as many Command Cards \
as they wish. If both players have Command Cards that are \
divulged at the same time, the blue player can reveal their \
Command Card ﬁrst. If this opportunity is declined, that card \
can no longer be divulged."
	},
	"Djem So Mastery":{
		"summary":"",
		"full":"When a unit with the Djem So Mastery keyword is defending \
against a melee attack, during the Compare Results step, the \
attacking unit suffers a wound if the attack roll contains one or \
more blank results."
	},
	"Droid Trooper":{
		"summary":"",
		"full":""
	},
	"Duelist":{
		"summary":"",
		"full":"When a unit with the Duelist keyword performs a melee attack, \
if it spends one or more aim tokens during the Reroll Attack \
Dice step, the attack pool gains the Pierce 1 weapon keyword. \
While a unit with the Duelist keyword defends against a melee \
attack, if it spends at least one dodge token during the Apply \
Dodge and Cover step, it gains the Immune: Pierce keyword. \
The unit with the Duelist keyword gets these effects in addition \
to the normal effects of spending aim or dodge tokens."
	},
	"Emplacement Trooper":{
		"summary":"",
		"full":""
	},
	"Enrage":{
		"summary":"",
		"full":"When a unit with the Enrage X keyword has wound tokens \
greater than or equal to X, that unit gains the Charge keyword \
and treats its courage value as “-” and loses any suppression \
tokens it may have. If a unit with the Enrage X keyword has \
wound tokens greater than or equal to X but removes wound \
tokens through an effect so that it has fewer than X, it no longer \
beneﬁts from the Enrage X keyword until it has wound tokens \
greater than or equal to X again."
	},
	"Entourage":{
		"summary":"",
		"full":"During Army Building, if a player includes a unit with the \
Entourage keyword, one unit speciﬁed by the Entourage \
keyword does not count its rank towards the maximum rank \
requirements for that rank. This can allow a player to bring \
more units of a speciﬁc rank than rank requirements allow. \
In the Command Phase, during the Issue Orders step, a \
unit with the Entourage keyword may issue an order to \
a friendly unit at range 2 that has the name speciﬁed by the \
Entourage keyword. \
Additionally, the unit speciﬁed by the Entourage keyword \
ignores the m rank requirement to provide backup to the unit \
with the Entourage keyword. \
For example, Director Orson Krennic has Entourage: Death \
Troopers. If an army includes Director Orson Krennic, 1 unit of \
Death Troopers in the same army does not count towards the \
maximum number of special forces ranks allowed in the army, \
allowing a player to bring up to three other special forces units in \
addition to the Death Troopers. In the Command Phase, Director \
Orson Krennic may issue an order to a Death Trooper unit at range 2."
	},
	"Equip":{
		"summary":"",
		"full":"During Army Building, if a player includes a unit with the \
Equip keyword, that unit must equip the upgrades listed after \
the keyword."
	},
	"Exemplar":{
		"summary":"",
		"full":"While attacking or defending, if a friendly unit is at range 2 and \
in LOS of one or more friendly units that have the Exemplar \
keyword and that share the same faction or aﬃliation as that \
attacking or defending unit, that attacking or defending unit \
may spend one aim, dodge, or surge token belonging to one of \
those units with Exemplar as if that attacking or defending unit \
had the token."
	},
	"Expert Climber":{
		"summary":"",
		"full":"When a unit with the Expert Climber keyword performs a \
climb, it may move a vertical distance up to height 2."
	},
	"Field Commander":{
		"summary":"",
		"full":"During Army Building, an army that includes a unit with the \
Field Commander keyword may ignore the minimum p rank \
requirement. If a player’s army contains no p units during \
Setup but does contain a unit with the Field Commander \
keyword, that unit gains a commander token. When a player \
reveals a non-p or o speciﬁc Command Card, they may \
nominate a friendly unit with the Field Commander keyword \
to be commander and issue orders. A unit with the Field \
Commander keyword is not a p and only counts as one for \
the purposes of issuing orders with a Command Card during \
the Command Phase. \
Additionally, if a friendly unit is at range 3 of the unit with the \
commander token and both units share the same faction or \
affiliation, that friendly unit may treat their courage value as 2 \
when checking for panic."
	},
	"Fire Support":{
		"summary":"",
		"full":"After a unit with the Fire Support keyword is issued an order, it \
gains a standby token."
	},
	"Fixed":{
		"summary":"",
		"full":"To add a weapon that has the Fixed: Front or Fixed: Rear \
keyword to an attack pool, the defending unit must have at least \
one of its miniature’s bases partially inside the speciﬁed ﬁring \
arc of the attacking miniature."
	},
	"Flawed":{
		"summary":"",
		"full":"A unit with the Flawed keyword has a corresponding Flaw Card \
that must be added to an opponent’s command hand during \
Setup. The unit the Flaw Card belongs to is indicated in the \
top right corner of the Flaw Card. An opponent may play a \
Flaw Card from their command hand when permitted by the \
rules on the Flaw Card. If both players have a Flaw Card in \
their command hand, at the start of each phase the player with \
priority must decide ﬁrst whether to play a Flaw Card or not. \
If neither player has priority, then the blue player decides ﬁrst. \
Any played Flaw Cards are discarded at the start of the End \
Phase and their effects end. \
Flaw Cards are not Command Cards and are not affected by \
rules that affect Command Cards."
	},
	"Flexible Response":{
		"summary":"",
		"full":"During Army Building, a unit with the Flexible Response \
keyword must equip X HEAVY WEAPON upgrades."
	},
	"Full Pivot":{
		"summary":"",
		"full":"When a unit with the Full Pivot keyword performs a pivot, it \
may pivot up to 360°."
	},
	"Generator":{
		"summary":"",
		"full":"During the End Phase, a unit with the Generator X keyword \
may ﬂip up to X inactive shield tokens to their active side."
	},
	"Graffiti Token":{
		"summary":"",
		"full":"A graﬃti token represents a striking image or symbol painted \
onto the terrain of the battleﬁeld. Graﬃti tokens affect a unit’s \
morale. Graﬃti tokens have two sides. Players should place the \
graﬃti token ﬂat on a surface so that the side that corresponds \
to their player color is faceup. \
During the Rally step of a unit’s activation, it may roll one \
additional die if it has LOS to and is at range 2 of a graﬃti token \
placed by a friendly miniature. It must roll one fewer die, to \
a minimum of 1, if it has LOS and is at range 2 of a graﬃti token \
placed by an enemy miniature. \
Graﬃti tokens remain in play until the end of the game. Units may \
move through and end a movement overlapping graﬃti tokens."
	},
	"Guardian":{
		"summary":"",
		"full":"While a friendly trooper unit at 1 and in LOS of a unit that \
has the Guardian X keyword is defending against a ranged \
attack, it may cancel up to X hit a results during the Modify \
Attack Dice step of the attack sequence. For each hit a result \
canceled in this way, the unit with the Guardian X keyword \
rolls a defense die matching the one on its Unit Card. After \
converting any defense surge e results according to its surge \
chart or by using surge tokens, the unit with the Guardian X \
keyword suffers one wound for each blank result. A defending \
unit that has the Guardian X keyword used on it gains a \
suppression token as normal. \
A unit cannot use Guardian X if the defending unit also has \
the Guardian X keyword. If multiple friendly units can use \
the Guardian X keyword during an attack, the player who \
controls those units declares which unit is using the Guardian \
X keyword and resolves their ability before choosing whether to \
declare that another unit is using the Guardian X keyword. \
A unit cannot use Guardian X if it has a number of suppression \
tokens equal to or greater than its courage. \
The Pierce X keyword can be used to cancel block d results on \
defense dice rolled by a unit using Guardian X; treat canceled \
block d results as blank results. After using Pierce X in this \
way, any unused Pierce X value can still be used to cancel block \
d results rolled by the defending unit. \
Additionally, a unit with the Guardian X keyword cannot \
beneﬁt from backup and ignores the m rank requirement to \
provide backup."
	},
	"Guidance":{
		"summary":"",
		"full":"When a unit uses the Guidance card action, choose another \
friendly unit of the speciﬁed unit type at 2. The chosen unit \
performs a free non-attack action."
	},
	"Gunslinger":{
		"summary":"",
		"full":"When a unit with the Gunslinger keyword reaches the Declare \
Additional Defender step, it may declare an additional defender \
and create an attack pool consisting solely of a ranged weapon \
that has already been contributed to another attack pool. The \
Gunslinger keyword can only be used once per attack sequence."
	},
	"Heavy Weapon Team":{
		"summary":"",
		"full":"A unit with the Heavy Weapon Team keyword must equip a \
HEAVY WEAPON Upgrade Card. The miniature added to the unit with this \
Upgrade Card becomes the unit leader."
	},
	"High Velocity":{
		"summary":"",
		"full":"While defending against an attack in which weapons with the \
High Velocity weapon keyword are the only weapons in an \
attack pool, the defending unit cannot spend dodge tokens \
during the Apply Dodge and Cover step."
	},
	"Hover":{
		"summary":"",
		"full":"A unit with the Hover: Ground or Hover: Air X keyword can \
perform standby actions during the Perform Actions step and \
can gain and spend standby tokens. A unit with the Hover: \
Ground or Hover: Air X keyword can reverse. \
A unit with the Hover: Ground keyword is treated as a ground \
vehicle by other units for all LOS purposes. For all other game \
effects, the unit is still treated as a repulsor vehicle. \
A unit with the Hover: Air X keyword ignores terrain of height \
X or lower while moving and may end a movement overlapping \
such terrain."
	},
	"Hunted":{
		"summary":"",
		"full":"During Setup, if one or more enemy units have the Bounty \
keyword, each unit with the Hunted keyword gains a \
bounty token."
	},
	"I'm Part of the Squad Too":{
		"full":"A unit with the I’m Part of the Squad Too keyword is contesting \
		an objective token if its unit leader is at range 1 of that token instead \
		of 1/2."
	},
	"Immobilize":{
		"summary":"",
		"full":"A unit that suffers one or more wounds after defending against \
an attack that includes a weapon with the Immobilize X weapon \
keyword gains X immobilize tokens. \
A unit’s maximum speed is reduced by 1 for each immobilize \
token it has. A unit whose maximum speed is 0 and has at least \
one immobilize token cannot perform moves of any kind. At \
the end of a unit’s activation, it removes any immobilize tokens \
that it has."
	},
	"Immune":{
		"full":"(Please check CRB for your particulary Immune:X, IOU one keyword list update...)"
	},
	"Immune: Deflect":{
		"summary":"",
		"full":"During an attack, if the attack pool contains weapons with the \
Immune: Deﬂect keyword, the attacking unit cannot suffer \
wounds from the Deﬂect keyword."
	},
	"Immune: Blast":{
		"summary":"",
		"full":"While a unit with the Immune: Blast keyword is defending, the \
effects of the Blast keyword are ignored."
	},
	"Immune: Enemy Effects":{
		"summary":"",
		"full":"A unit with the Immune: Enemy Effects keyword ignores \
all enemy card effects and cannot be targeted by any enemy \
card effects."
	},
	"Immune: Melee":{
		"summary":"",
		"full":"Enemy units cannot be placed in base contact with a unit that \
has the Immune: Melee keyword."
	},
	"Immune: Melee Pierce":{
		"summary":"",
		"full":"While a unit with the Immune: Melee Pierce keyword is \
defending against a melee attack, the attacker cannot use the \
Pierce X weapon keyword to cancel d results on defense dice \
during the Modify Defense Dice step. \
While a unit with Immune: Melee Pierce is using the Guardian \
X keyword during a melee attack, the attacking unit cannot use \
the Pierce X keyword to cancel d results on defense dice rolled \
by that unit for the Guardian X keyword."
	},
	"Immune: Pierce":{
		"summary":"",
		"full":"While a unit with the Immune: Pierce keyword is defending, the \
attacker cannot use the Pierce X weapon keyword to cancel d \
results on defense dice during the Modify Defense Dice step. \
While a unit with Immune: Pierce is using the Guardian X \
keyword, the attacking unit cannot use the Pierce X keyword \
to cancel d results on defense dice rolled by that unit for the \
Guardian X keyword."
	},
	"Immune: Range 1 Weapons":{
		"summary":"",
		"full":"An attack pool that is assigned to a unit with the Immune: \
Range 1 Weapons keyword cannot contain weapons with a \
maximum range of 1."
	},
	"Impact":{
		"summary":"",
		"full":"During the Modify Attack Dice step, if the defending unit has \
the Armor or Armor X keyword, a unit whose attack pool \
includes a weapon that has the Impact X keyword can modify \
up to X hit a results to critical b results for that attack."
	},
	"Impervious":{
		"summary":"",
		"full":"While a unit with the Impervious keyword is defending, it \
rolls a number of extra defense dice during the Roll Defense \
Dice step equal to the total Pierce X value of weapons in the \
attack pool."
	},
	"Incognito":{
		"summary":"",
		"full":"A unit with the Incognito keyword cannot be attacked by \
enemy units that are beyond 1 of it, cannot contest objectives, \
and cannot provide backup. \
If a unit with the Incognito keyword ever performs an attack \
or defends against an attack, it loses all special rules of the \
Incognito keyword for the remainder of the game. Additionally, \
at the beginning of a unit with the Incognito keyword’s \
activation, it may choose to lose the special rules of the \
Incognito keyword for the remainder of the game."
	},
	"Inconspicuous":{
		"summary":"",
		"full":"While a unit with the Inconspicuous keyword has at least one \
suppression token, when an enemy unit performs an attack, \
it must target another unit, if able. When a unit with the \
Inconspicuous keyword rallies, it may choose to not remove any \
number of suppression tokens, including zero."
	},
	"Independent":{
		"summary":"",
		"full":"At the start of the Activation Phase, if a unit with the \
Independent keyword does not have an order token, that unit \
may gain X of the listed token(s) or perform the listed action as \
a free action."
	},
	"Indomitable":{
		"summary":"",
		"full":"When a unit that has the Indomitable keyword performs its \
Rally step, it rolls red defense dice instead of white defense dice."
	},
	"Infiltrate":{
		"summary":"",
		"full":"At the start of an undeployed unit with the Inﬁltrate keyword’s \
activation, it may deploy by placing the unit leader of that unit \
within friendly territory. Then the remaining miniatures in that \
unit are placed in cohesion with their unit leader and within \
friendly territory. Miniatures cannot overlap impassable terrain \
when they are placed using Inﬁltrate."
	},
	"Inspire":{
		"summary":"",
		"full":"At the end of a unit with the Inspire X keyword’s activation, \
remove up to X total suppression tokens from other friendly \
units at 2."
	},
	"Interrogate":{
		"full":"During the Command Phase, if a player reveals a Command \
Card that belongs to a unit at 1 of one or more enemy units \
with the Interrogate keyword and there would be a tie for \
priority, treat that Command Card as having one more pip."
	},

	"Ion":{
		"summary":"",
		"full":"A vehicle or droid trooper unit that suffers wounds after \
defending against an attack that included a weapon with the Ion \
X keyword gains X ion tokens. \
At the start of a unit’s activation, roll one white defense die for \
every ion token that unit has. If any blank results are rolled, that \
unit performs one fewer action during its activation. At the end \
of a unit’s activation, it removes any ion tokens that it has. \
If an attack pool includes the Ion X keyword, at the start of \
the Modify Attack Dice step of the attack sequence, before any \
other effects, the defending unit must ﬂip active shield tokens, \
if able, for each hit a or critical b result in the attack roll, up \
to X."
	},
	"Jar'Kai Mastery":{
		"full":"While performing a melee attack, after converting attack surges \
during the Convert Attack Surges step, a unit with the Jar'Kai \
Mastery keyword may spend any number of dodge tokens. For \
each dodge token spent in this way, change a blank result to a \
hit a result, a hit a result to a critical b result, or spend two \
dodge tokens to change a blank result to a critical b result."
	},
	"Jedi Hunter":{
		"summary":"",
		"full":"When a unit with the Jedi Hunter keyword attacks a unit with a \
FORCE upgrade icon on its upgrade bar, it gains surge:crit."
	},
	"Jump":{
		"summary":"",
		"full":"A unit that has the Jump X keyword can perform the Jump X \
card action any time it could perform a move action. The unit \
performs a move action as normal and can ignore or end its \
movement on top of terrain that is height X or lower. While \
performing a move with the Jump X action, a unit ignores the \
effects of diﬃcult terrain and other miniatures with a height \
equal to or lower than X. When making a move with the Jump \
X action, a unit may place the movement template overlapping \
impassable terrain but may not end its move overlapping it. \
When a unit performs the Jump X action, measure height from \
that unit’s starting position."
	},
	"Juyo Mastery":{
		"summary":"",
		"full":"While a unit with the Juyo Mastery keyword has one or more \
wound tokens, it can perform one additional action during its \
activation. A unit with Juyo Mastery may only perform two \
move actions during its activation, including free actions."
	},
	"Latent Power":{
		"summary":"",
		"full":"At the end of a unit with the Latent Power keyword’s activation, \
it may gain 1 suppression token to roll 1 red defense die. If \
it does, on a e result, choose an enemy unit at 1 of this \
miniature. The chosen unit gains 2 suppression tokens and 2 \
immobilize tokens. On a blank result, remove 1 wound or 1 \
poison token from a friendly non-droid trooper unit at 1 of \
this miniature."
	},
	"Leader":{
		"summary":"",
		"full":"A miniature with the Leader keyword is treated as a unit’s unit \
leader for all rules purposes. \
If a miniature with the Leader keyword and a wound threshold \
of 2 is defeated while in a unit with a wound threshold of 1, \
replace one of the remaining miniatures in that unit as normal, \
then assign the miniature with the Leader keyword one \
wound token. \
Only one Upgrade Card with the Leader keyword can be \
equipped to each unit."
	},
	"Lethal":{
		"summary":"",
		"full":"When a unit performs an attack with a weapon that has the \
Lethal X keyword in the attack pool, it can spend up to X Aim \
tokens during the Modify Attack Dice step. If it does, the attack \
pool gains Pierce 1 for each aim token spent. The attacking unit \
may not reroll dice with any aim tokens spent in this way."
	},
	"Loadout":{
		"summary":"",
		"full":"During Army Building, when a player includes a unit with \
the Loadout keyword in their army, for each Upgrade Card \
equipped to that unit, they may choose another eligible \
Upgrade Card of the same type with an equal or lesser point \
cost and set it aside. During Setup, a unit with the Loadout \
keyword may swap any number of its equipped Upgrade Cards \
with the matching set-aside Upgrade Cards one for one. \
When swapping Upgrade Cards, a unit cannot have two or \
more upgrades with the same name equipped at the same time. \
If two or more units with the Loadout keyword are in the same \
army, keep their respective set-aside Upgrade Cards separate. \
Each unit can swap Upgrade Cards only with their own set- \
aside cards; they cannot share set-aside Upgrade Cards. \
A Counterpart Card that is added to a unit with the Loadout \
keyword also beneﬁts from the Loadout ability."
	},
	"Long Shot":{
		"summary":"",
		"full":"When a unit with a weapon with the Long Shot keyword \
performs an attack, before choosing an enemy unit to attack \
during the Declare Defenders step, it may spend an aim token \
to increase the maximum range of that weapon by one until the \
end of that attack sequence. The attacking unit may not reroll \
dice with any aim tokens spent in this way. Only one aim token \
may be spent in this way per attack sequence."
	},
	"Low Profile":{
		"summary":"",
		"full":"While defending against a ranged attack, if a unit with the Low \
Proﬁle keyword would roll one or more defense dice during the \
Roll Cover Pool step, it rolls one fewer defense die and instead \
adds an additional d result to the cover pool after rolling."
	},
	"Makashi Mastery":{
		"summary":"",
		"full":"While a unit with the Makashi Mastery keyword performs a \
melee attack, during the Choose Weapons and Gather Dice step, \
it can reduce the Pierce X value of a weapon in the attack pool \
by 1. If it does, the defender cannot use the Immune: Pierce \
and/or Impervious keywords during this attack."
	},
	"Marksman":{
		"summary":"",
		"full":"After converting attack surges during the Convert Attack \
Surges step, a unit with the Marksman keyword may spend any \
number of aim tokens. For each aim token spent in this way, \
instead of rerolling dice, change a blank result to a hit a result, \
a hit a result to a critical b result, or spend two aim tokens to \
change a blank result to a critical b result."
	},
	"Master of the Force":{
		"summary":"",
		"full":"At the end of its activation, a unit that has the Master of the \
Force X keyword may ready up to X of its exhausted FORCE \
Upgrade Cards."
	},
	"Master Storyteller":{
		"summary":"",
		"full":"When a unit performs the Master Storyteller card action, it \
chooses up to X friendly EWOK units at range 2, where X is the current \
round number. Each chosen unit gains 2 surge tokens."
	},
	"Mercenary":{
		"summary":"",
		"full":"A unit with the Mercenary keyword is a Mercenary unit. The \
faction(s) specified by the Mercenary keyword can include that \
unit in an army as a Mercenary unit."
	},
	"Nimble":{
		"summary":"",
		"full":"After a unit that has the Nimble keyword defends against an \
attack, if it spent at least one dodge token during any point of \
the attack sequence, it gains one dodge token."
	},
	"Noncombatant":{
		"summary":"",
		"full":"A miniature with the Noncombatant keyword cannot add any \
weapons to attack pools, and any wounds must be assigned \
to non-unit leader miniatures without the Noncombatant \
keyword, if able. If a miniature with the Noncombatant keyword \
already has one or more wound tokens, it must be assigned \
wounds before miniatures that do not have wound tokens. If the \
unit leader miniature in a unit with the Noncombatant keyword \
is defeated, a Noncombatant miniature cannot be replaced by a \
new unit leader miniature unless there are no other miniatures \
without the Noncombatant keyword."
	},
	"Observe":{
		"summary":"",
		"full":"As a card action or free card action, a unit with the Observe \
X keyword can choose an enemy unit at 3 and in LOS. The \
chosen enemy unit gains X observation tokens. Observation \
tokens are removed during the Remove Tokens step of the \
End Phase. \
During an attack, a friendly attacking unit can spend any \
number of observation tokens that belong to the defending unit \
during the Reroll Attack Dice step. The attacking unit rerolls \
one attack die for each observation token spent. Observation \
tokens are spent one at a time, and the same die can be rerolled \
multiple times by spending subsequent observation tokens \
or aim tokens. The attacking unit may spend aim tokens and \
observation tokens in any order."
	},
	"Outmaneuver":{
		"summary":"",
		"full":"During the Apply Dodge and Cover step, a unit with the \
Outmaneuver keyword can spend dodge tokens to cancel \
critical b results."
	},
	"Override":{
		"summary":"",
		"full":"When a friendly unit begins its activation while at 5 of a unit \
that has the Override keyword, the unit with the Override \
keyword may gain one suppression token. If it does, the \
activating unit ignores the AI keyword during its activation."
	},
	"Overrun":{
		"summary":"",
		"full":"A weapon with a red overrun range icon 8 is an overrun \
weapon and can only be used during overrun attacks. Overrun \
attacks are not ranged or melee attacks. A unit may make X \
overrun attacks during its activation. A unit with an overrun \
weapon can perform an overrun attack after it performs a \
standard move in which the movement tool or one of its \
miniatures’ bases overlapped an enemy miniature’s base. \
After completing the move, the unit with the overrun weapon \
performs an attack against the unit it moved through, ignoring \
range when making this attack. It can only form one attack pool \
when making this attack, and only weapons with the Overrun \
X keyword can be in this attack pool. The overrun weapon is \
only added to the attack pool once, even if there are multiple \
miniatures in the unit. \
If a unit can perform multiple overrun attacks during its \
activation, it must perform a separate move through an enemy \
unit for each overrun attack."
	},
	"Permanent":{
		"summary":"",
		"full":"Some Command Cards have the Permanent keyword. Unlike \
ordinary Command Cards, these cards are not discarded from \
play during the End Phase and their effects persist as long as \
they are in play."
	},
	"Pierce":{
		"summary":"",
		"full":"If an attacking unit attacks with a weapon with the Pierce X \
keyword it may cancel up to X d results during the Modify \
Defense Dice step. \
The Pierce X keyword can be used to cancel d results on \
defense dice rolled by a unit using the Guardian X keyword. \
When doing so, treat canceled d results as blank results. After \
using the Pierce X keyword in this way, any unused Pierce \
X value can still be used to cancel d results rolled by the \
defending unit. \
For example, a unit with Pierce 3 attacks an enemy unit, and \
another enemy unit uses Guardian 2 to cancel 2 hit a results. \
After converting defense surge e results, the unit using Guardian \
has rolled 2 block d results. The attacking unit uses Pierce to \
cancel the 2 block d results and the unit using Guardian suffers \
2 wounds. \
Now the defending unit rolls defense dice and the attacking unit \
may cancel 1 more block d result rolled by the defending unit \
since only 2 of its original Pierce 3 have been used so far."
	},
	"Plodding":{
		"summary":"",
		"full":"During its activation, a unit with the Plodding keyword can \
only perform one move action."
	},
	"Poison":{
		"summary":"",
		"full":"A non-droid trooper unit that suffers wounds caused by an \
attack pool that included a weapon with the Poison X keyword \
gains X poison tokens. \n \
At the end of a unit's activation, it suffers one wound for each \
poison token it has, then removes all of its poison tokens."
	},
	"Prepared Position":{
		"summary":"",
		"full":"During the Deploy in Prepared Positions step of setup, a unit \
with the Prepared Position keyword may deploy by placing \
the unit leader of that unit within friendly territory. Then the \
remaining miniatures in that unit are placed in cohesion with \
their unit leader and within friendly territory. That unit then \
gains 1 dodge token. Miniatures cannot overlap impassable \
terrain when they are placed using Prepared Position."
	},
	"Primitive":{
		"full":"During the Modify Attack Dice step, after resolving any \
instances of the Impact X keyword, if the defending unit has the \
Armor or Armor X keyword, a unit whose attack pool includes \
a weapon that has the Primitive keyword must modify all \
critical b results to hit a results for that attack."
	},
	"Precise":{
		"summary":"",
		"full":"When an attacking unit that has the Precise X keyword spends \
an aim token during the Reroll Attack Dice step, it can reroll up \
to X additional attack dice per aim token spent."
	},
	"Programmed":{
		"summary":"",
		"full":"A unit with the Programmed keyword must equip at least one PROTOCOL \
Upgrade Card during Army Building."
	},
	"Pulling the Strings":{
		"summary":"",
		"full":"When a unit uses the Pulling the Strings card action, choose \
another friendly trooper unit at 2. The chosen unit may \
perform a free attack action or a free move action."
	},
	"Quick Thinking":{
		"summary":"",
		"full":"When a unit performs the Quick Thinking card action, it gains \
one aim and one dodge token."
	},
	"Ram":{
		"summary":"",
		"full":"While a unit performs an attack using an attack pool that \
includes a weapon with the Ram X keyword, during the Modify \
Attack Dice step, it may change X results to b results if it meets \
either of the following conditions: \
• The unit leader has a notched base and the unit performed \
at least one full standard move at its maximum speed during \
the same activation as an attack using Ram X. \
• The unit leader has a small base and the unit performed at \
least one move during the same activation as an attack using \
Ram X."
	},
	"Ready":{
		"summary":"",
		"full":"After a unit with the Ready X keyword performs a standby \
action, it gains X aim tokens."
	},
	"Recharge":{
		"summary":"",
		"full":"When a unit with the Recharge X keyword recovers, it may flip \
up to X inactive shield tokens from their inactive side to their \
active side."
	},
	"Reconfigure":{
		"summary":"",
		"full":"When a unit equipped with an Upgrade Card with the \
Reconﬁgure keyword recovers or performs a recover action, the \
player that controls that unit may ﬂip that Upgrade Card to a \
different side in addition to any other effects of that recover. \
If an Upgrade Card has the exhaust icon, using the Reconﬁgure \
ability does not cause that Upgrade Card to be exhausted."
	},
	"Regenerate":{
		"summary":"",
		"full":"At the end of a unit’s activation, if it has the Regenerate X \
keyword, it rolls one white defense die for each wound token \
it has, up to X. For each d or e result, it removes one \
wound token."
	},
	"Reinforcements":{
		"summary":"",
		"full":"At the start of the End Phase of the first round of a game, a \
Unit with the Reinforcements keyword may perform a free \
speed-1 move."
	},
	"Relentless":{
		"summary":"",
		"full":"After a unit that has the Relentless keyword performs a move \
action, it may perform a free attack action."
	},
	"Reliable":{
		"full":"At the start of the Activation Phase, a unit with the Reliable X \
keyword gains X surge tokens."
	},
	"Repair":{
		"summary":"",
		"full":"When a unit uses the Repair X: Capacity Y card action, choose a \
friendly droid trooper or vehicle unit at range 1 and LOS and place \
one wound token on the card that has the Repair X: Capacity \
Y keyword. Remove a total of up to X wound, ion, and/or \
vehicle damage tokens from the chosen unit or restore up to X \
miniatures to that unit. This ability cannot be used if the card \
that has the Repair X: Capacity Y keyword has a number of \
wound tokens on it equal to or exceeding Y. \
Wound tokens on cards are not considered to be on units and \
do not count toward a unit’s wound threshold, nor can they be \
removed by abilities that remove wound tokens from units. \
If a unit has multiple Repair X: Capacity Y abilities, treat each \
keyword as a separate ability. \
Additionally, each action is considered unique, and a unit that \
has access to more than one can use each ability once during \
its activation. This applies even if the unit has access to two \
identical abilities from different sources."
	},
	"Reposition":{
		"summary":"",
		"full":"When a unit with the Reposition keyword performs a standard \
move, it may perform a pivot either before or after performing \
that standard move."
	},
	"Restore":{
		"summary":"",
		"full":"Some abilities, such as the Treat and Repair keywords or certain \
card effects, allow a player to restore miniatures to friendly \
units. To restore a miniature to a unit, that unit must have \
had one or more miniatures defeated that round. Choose a \
miniature that was defeated during the current round and place \
that miniature on the battleﬁeld in cohesion with its unit leader. \
Then, give that miniature a number of wound tokens equal to \
one less than the wound threshold indicated on its Unit Card."
	},
	"Retinue":{
		"summary":"",
		"full":"At the start of the Activation Phase, if a unit with the Retinue \
keyword is at 2 of another friendly unit or type of unit \
specified by the Retinue keyword, it gains either one aim or one dodge token. \n \
Additionally, a unit with the Retinue keyword ignores the \
CORPS rank requirement to provide backup to the specified unit."
	},
	"Ruthless":{
		"summary":"",
		"full":"When another friendly m trooper unit at 2 and in LOS that \
has a faceup order token activates, it may suffer 1 wound to \
perform 1 free action."
	},
	"Scale":{
		"summary":"",
		"full":"When a unit with the Scale keyword performs a climb, it may \
move a vertical distance up to height 2. \
When a unit that has the Scale keyword performs a move, it \
does not reduce its maximum speed for moving out of, into, or \
through difficult terrain."
	},
	"Scatter":{
		"summary":"",
		"full":"After a unit performs an attack against a trooper unit on small \
bases using an attack pool that includes a weapon with the \
Scatter keyword, it may place any non-unit leader miniatures in \
the defending unit, following all the rules of cohesion, as if the \
defending unit leader had just performed a standard move."
	},
	"Scout":{
		"summary":"",
		"full":"When an undeployed unit with the Scout X keyword activates, \
at the start of its Perform Actions step, it may deploy by \
performing a free speed-X move action, ignoring difficult \
terrain. A unit can perform this move regardless of its \
maximum speed. \
The Scout X keyword is cumulative but cannot exceed 3. If a \
unit would ever have Scout X exceeding Scout 3, it has Scout \
3 instead."
	},
	"Scouting Party":{
		"summary":"",
		"full":"During Setup, the controlling player of a unit with the Scouting \
Party keyword may choose up to X friendly trooper units that \
share the same faction or affiliation with that unit and do not \
have the Scout keyword. Each chosen unit gains the Scout X \
keyword this game, where X is the Scout X value of the unit \
with the Scouting Party keyword."
	},
	"Secret Mission":{
		"summary":"",
		"full":"Once per game, at the beginning of the Command Phase, if a \
unit with the Secret Mission keyword is within enemy territory, \
it gains a secret mission token. \
When scoring VP, if a player controls a unit with one or more \
secret mission tokens and that unit is within enemy territory, \
that unit’s controlling player scores 1 VP. Then, remove those \
secret mission tokens from the game."
	},
	"Self-Destruct":{
		"summary":"",
		"full":"A weapon with a red 0 icon is a Self-Destruct weapon and can \
only be used during Self-Destruct attacks. Self-Destruct attacks are \
ranged attacks even though Self-Destruct weapons are not ranged \
weapons. A unit can perform a Self-Destruct attack as a free action \
during its activation if it has at least X wound tokens. Perform an \
attack using a unit’s Self-Destruct weapon against each unit at range 1 \
and in LOS, even if they are engaged. Self-Destruct attacks may not \
be made by a unit that is embarked on a transport. \
After performing all attacks, the unit performing the Self- \
Destruct attack is defeated and removed from play."
	},
	"Self-Preservation":{
		"summary":"",
		"full":"When checking to see if a unit with the Self-Preservation \
keyword panics, that unit cannot use the courage value of units \
that are not of the same affiliation."
	},
	"Sentinel":{
		"summary":"",
		"full":"A unit with the Sentinel keyword can spend a standby token \
after an enemy unit performs an attack, move, or action at 3, \
rather than at range 2."
	},
	"Sharpshooter":{
		"summary":"",
		"full":"During the Determine Cover step, a unit with the Sharpshooter \
X keyword subtracts X from the numerical value of the \
defender’s cover. \n \
For example, a unit with heavy cover and a suppression token \
that is attacked by a unit with Sharpshooter 1 has light cover."
	},
	"Shield Token":{
		"summary":"",
		"full":"Shield tokens are double-sided, with an active side and an \
inactive side, and always enter play with their active side faceup \
placed on the battlefield next to the unit that has those shield \
tokens. When a unit flips an active shield token, that shield \
token is flipped to its inactive side and is now inactive. When a \
unit flips an inactive shield token, that shield token is flipped to \
its active side and is now active. \
While defending against a ranged attack, during the Modify \
Attack Dice step, a defending unit may flip any number of its \
active shield tokens to their inactive side to cancel one hit a or \
critical b result for each shield token flipped in this way."
	},
	"Shielded":{
		"summary":"",
		"full":"A unit with the Shielded X keyword has X shield tokens. Shield \
tokens belong to the unit and are not assigned to individual \
miniatures. If a unit gains the Shielded X keyword, it gains X \
shield tokens. Similarly, if a unit loses the Shielded X keyword it \
loses X shield tokens."
	},
	"Sidearm":{
		"summary":"",
		"full":"If an upgrade has the Sidearm: Melee keyword, the miniature \
added by that upgrade or with that upgrade cannot add any \
melee weapons to attack pools other than any melee weapons \
on the Upgrade Card with the Sidearm: Melee keyword. \
If an upgrade has the Sidearm: Ranged keyword, the miniature \
added by that upgrade cannot add any ranged weapons to attack \
pools other than any ranged weapons on the Upgrade Card with \
the Sidearm: Ranged keyword. \
For example, the Electrostaff Guard Upgrade Card provides a \
melee weapon and has the Sidearm: Melee keyword. The miniature \
added by that upgrade can only use the weapon on the Electrostaff \
Guard upgrade during a melee attack. That miniature may still \
use any available ranged weapon, such as the ranged weapon on \
the Imperial Royal Guard Unit Card, during a ranged attack."
	},
	"Skirmish":{
		"summary":"",
		"full":"This mission card is only used in Skirmish mode."
	},
	"Small":{
		"summary":"",
		"full":"While a unit is defending against a non-area ranged attack, \
miniatures with the Small keyword are ignored for the purposes \
of determining LOS, cover, and range. The miniature with the \
Small keyword is treated as though it were not a part of the \
defending unit."
	},
	"Smoke":{
		"summary":"",
		"full":"A unit that has the Smoke X keyword can perform the Smoke X \
action. To perform this action, the unit places X smoke tokens \
within 1 and in LOS of its unit leader. \
Smoke tokens cannot overlap any objective, advantage, charge, \
or other smoke tokens and must be placed on a ﬂat surface."
},
	"Smoke Tokens":{
		"full":"Trooper units whose unit leader is at range 1 of a smoke token \
improve the numerical value of their cover by 1 during the \
Determine Cover step. While a trooper unit is attacking, if the \
attacking unit leader is at range 1 of a smoke token, the defending \
unit improves the numerical value of their cover by 1. Effects \
that improve a unit’s cover are cumulative. A unit cannot be \
affected by the same Smoke token more than once. Smoke \
tokens are removed during the Remove Tokens step of the \
End Phase. \
For example, a trooper unit whose unit leader is at range 1 of 2 smoke \
tokens would improve the numerical value of its cover by 2."
	},
	"Soresu Mastery":{
		"summary":"",
		"full":"When a unit with Soresu Mastery is defending against a ranged \
attack, it may reroll all of its defense dice during the Reroll \
Defense Dice step. Additionally, when a unit with Soresu \
Mastery is using the Guardian X keyword, it may spend one \
dodge token before converting any e results. If it does, it \
rerolls all of its defense dice before converting e results. Each \
die cannot be rerolled more than once using Soresu Mastery."
	},
	"Special Issue":{
		"summary":"",
		"full":"A unit with the Special Issue keyword can only be included in \
an army using the speciﬁed Battle Force."
	},
	"Speeder":{
		"summary":"",
		"full":"While it is performing a move, a unit that has the Speeder \
X keyword can move over or end its movement on terrain \
equal to or less than height X. Additionally, when a unit on \
notched bases performs a move, it skips step 1 of notched base \
movement, rotating the unit leader’s base. \
A unit with the Speeder X keyword must perform a free \
compulsory move action at the start or end of its Perform \
Actions step. \
If a unit with the Speeder X keyword performs more than one \
non-compulsory move action during its activation, it may not \
claim asset tokens that activation. Additionally, a unit with the \
Speeder X keyword that has claimed an asset token can perform \
only one non-compulsory move action during its activation."
	},
	"Spotter":{
		"full":"As a card action, a unit with the Spotter X keyword can \
			choose up to X friendly units at range 2. Each chosen unit gains an \
			aim token.",
	},
	"Spray":{
		"summary":"",
		"full":"When a miniature adds a weapon that has the Spray keyword \
to the attack pool, that weapon contributes its dice a number of \
times equal to the number of miniatures in the defending unit \
that are in LOS of the miniature using that weapon. \
For example, if an AT-RT with a ﬂamethrower attacks a unit of \
3 Death Troopers, since the ﬂamethrower has the Spray keyword \
and an attack value of 2 black die, the ﬂamethrower contributes \
6 black attack dice to the attack pool."
	},
	"Spur":{
		"summary":"",
		"full":"When a unit with the Spur keyword performs a move, its \
controlling player may assign it one suppression token to \
increase its maximum speed by 1 for that move, to a maximum \
of 3. When a unit performs a move, apply any effects that \
increase the unit’s maximum speed before applying any effects \
that reduce that unit’s maximum speed. \
For example, a unit that normally has a maximum speed of 1, \
but has 1 immobilize token, can use the Spur keyword to perform \
a move with a total maximum speed of 1. However, a unit that \
normally has a maximum speed of 1, but has 2 immobilize \
tokens, cannot use the Spur keyword to perform a move because \
its maximum speed would still be 0."
	},
	"Stationary":{
		"summary":"",
		"full":"A unit with the Stationary keyword cannot perform moves \
unless the move is a pivot. A unit with the Prepared Position \
and Stationary keywords must deploy during the Deploy in \
Prepared Positions step of setup. \
STEADY  \
After a unit that has the Steady keyword performs a move \
action, it may perform a free attack action. During this attack \
action it may only add ranged weapons to attack pools."
	},
	"Steady":{
		"summary":"",
		"full":"After a unit that has the Steady keyword performs a move \
action, it may perform a free attack action. During this attack \
action it may only add ranged weapons to attack pools."
	},
	"Strafe":{
		"full":"If the unit with the Hover: Ground/Air X keyword has a base \
with side notches, the unit may perform a strafe move as part \
of a move action instead of moving normally. A unit reduces \
its maximum speed by 1 to a minimum of 1 while performing \
a strafe. As with other movements with notched bases, a strafe \
can be a full strafe or a partial strafe, and can be interrupted if \
an object prevents the straﬁng miniature from fully progressing \
across the movement tool. \
To perform a full strafe, place the end of a movement tool \
into one of the side notches on the unit’s base. Keeping the \
movement tool in place on the battleﬁeld, move the miniature \
along the movement tool until the opposite side notch is wholly \
in the opposite end of the movement tool. While performing a \
strafe, a miniature’s base must not overlap terrain that it cannot \
move through."
	},
	"Strategize":{
		"summary":"",
		"full":"When a unit uses the Strategize X action, it gains one \
suppression token, then chooses X friendly units at range 2. Each \
chosen unit gains one aim and one dodge token."
	},
	"Suppressive":{
		"summary":"",
		"full":"After defending against an attack pool that includes a weapon \
with the Suppressive keyword, the defending unit gains one \
suppression token during the Assign Suppression Token to \
Defender step."
	},
	"Tactical":{
		"summary":"",
		"full":"The Tactical X keyword allows a unit to gain a number of aim \
tokens equal to X each time it performs a standard move as part \
of an action or free action."
	},
	"Take Cover":{
		"summary":"",
		"full":"As a card action, a unit with the Take Cover X keyword can \
choose up to X friendly units at range 2. Each chosen unit gains one \
dodge token."
	},
	"Target":{
		"summary":"",
		"full":"After a unit with the Target X keyword is issued an order, it \
gains X aim tokens."
	},
	"Teamwork":{
		"summary":"",
		"full":"When a unit with the Teamwork keyword is at range 2 of a friendly \
unit that has the unit name speciﬁed by the Teamwork keyword, \
if either unit gains an aim token or a dodge token, the other unit \
gains a token of the same type."
	},
	"Tempted":{
		"summary":"",
		"full":"If a friendly unit is defeated by an enemy attack and the \
attacking unit is at range 3 of a unit with the Tempted keyword, \
after the attack is resolved, that unit with the Tempted keyword \
may perform a free attack action or a speed-2 move ignoring \
diﬃcult terrain. A unit may use the Tempted keyword only once \
each round."
	},
	"Tow Cable":{
		"summary":"",
		"full":"After a vehicle is wounded by an attack pool that included a \
weapon with the Tow Cable keyword, the player who performed \
the attack performs a pivot with the vehicle that was wounded."
	},
	"Transport":{
		"full":"During Setup, a unit with the Transport keyword may choose \
a friendly m or n unit to transport. During the Issue \
Orders step of the Command Phase of round 1, a unit with the \
Transport keyword may issue an order to the chosen unit. If the \
chosen unit is undeployed when the unit with the Transport \
keyword deploys, after the effect is resolved, the chosen unit \
deploys by performing a speed-1 move. Measure the start of \
this move with both prongs of one side of the movement tool \
touching the base of the unit with the Transport keyword. \
When the chosen unit deploys in this way, the unit leader of \
that unit measures the vertical distance changed during that \
move starting from the unit with the Transport keyword."
	},
	"Transport:  Closed":{
		"summary":"",
		"full":"See CRB"
	},
	"Transport:  Open":{
		"summary":"",
		"full":"See CRB"
	},
	"Treat":{
		"summary":"",
		"full":"When a unit uses the Treat X: Capacity Y card action, choose \
a friendly non-droid trooper unit at range 1 and LOS and place \
one wound token on the card that has the Treat X: Capacity \
Y keyword. Remove a total of up to X wound and/or poison \
tokens from the chosen unit or restore up to X miniatures to \
that unit. This ability cannot be used if the card that has the \
Treat X: Capacity Y keyword has a number of wound tokens on \
it equal to or exceeding Y. \
Wound tokens on cards are not considered to be on units and \
do not count toward a unit’s wound threshold, nor can they be \
removed by abilities that remove wound tokens from units. \
If a unit has multiple Treat X: Capacity Y abilities, treat each \
keyword as a separate ability. \
Additionally, each action is considered to be unique, and a \
unit that has access to more than one can use each ability once \
during its activation. This applies even if the unit has access to \
two identical abilities from different sources."
	},
	"Uncanny Luck":{
		"summary":"",
		"full":"While a unit with the Uncanny Luck X keyword is defending \
against an attack, it may reroll up to X of its defense dice \
during the Reroll Defense Dice step. Any dice rerolled with the \
Uncanny Luck X keyword must be rerolled at the same time, \
and each die cannot be rerolled more than once."
	},
	"Unconcerned":{
		"summary":"",
		"full":"A unit with the Unconcerned keyword cannot beneﬁt from \
cover, and miniatures in the unit cannot be repaired or restored."
	},
	"Unhindered":{
		"summary":"",
		"full":"When a unit that has the Unhindered keyword performs a \
move, it does not reduce its maximum speed for moving out of, \
into, or through diﬃcult terrain."
	},
	"Unstoppable":{
		"summary":"",
		"full":"A unit with the Unstoppable keyword is eligible to activate \
during the Activation Phase while it has one or fewer facedown \
order tokens. This unit may never have more than one faceup \
order token. While this unit is not defeated, when creating its \
order pool, its controlling player adds an additional order token \
corresponding to this unit’s rank to their order pool."
	},
	"Versatile":{
		"summary":"",
		"full":"Some ranged weapons have the Versatile keyword. Units can \
perform ranged attacks using a weapon with the Versatile \
keyword even while engaged. A weapon with the Versatile \
keyword that is both a ranged weapon and a melee weapon can \
be used to perform either a ranged attack or a melee attack."
	},
	"Weak Point":{
		"summary":"",
		"full":"While a unit with the Weak Point X: Front/Rear/Sides keyword \
is defending, if the attacking unit’s unit leader is at least partially \
inside the speciﬁed ﬁring arc of the defending unit, the attack \
pool gains the Impact X keyword where X is equal to the value \
of Weak Point X. \
While a unit with the Weak Point X keyword is defending \
against a ranged attack made by an area weapon, treat the \
charge or advantage token as the attacking unit leader."
	},
	"Weighed Down":{
		"full":"While a unit with the Weighed Down keyword is holding 1 or \
more objective tokens, it cannot use the Jump keyword."
	},
	"We're Not Regs":{
		"full":"A unit with the We’re Not Regs keyword may not spend green \
tokens on other Clone Trooper units, and other Clone Trooper \
units may not spend this unit’s green tokens. Additionally, this \
unit cannot beneﬁt from backup. \
Players should use the ball-form Droideka miniatures only \
when the unit uses the Wheel Mode keyword and only for the \
duration of that round. At the end of the round, any ball- \
form Droideka miniatures should be replaced with standing \
Droideka miniatures."
	},
	"Wheel Mode":{
		"summary":"",
		"full":"At the start of its activation, a unit with the Wheel Mode \
keyword can increase its maximum speed to 3 until the end of \
that activation. If it does, until the end of the round, it gains the \
Cover 2 keyword and cannot attack or ﬂip active shield tokens. \
To indicate that a unit of Droidekas is using the Wheel Mode \
keyword, a player may replace their standing Droideka \
miniatures with ball-form Droideka miniatures, or simply mark \
the unit with a Wheel Mode token."
	},
	"Wound":{
		"summary":"",
		"full":"The ﬁrst time a unit with the Wound X keyword enters play, \
that unit suffers X wounds."
	}
}

export default keywords;