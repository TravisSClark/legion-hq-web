const keywords = {

	/**
	 * TODO, finish current pass of keyword updates, then re-do this schema to make things a little nicer:
	 * 
	 * {
	 * 	"Keyword Name":{
	 * 		"text":"...",
	 * 		"summary"?:".."
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


	"Advanced Targeting": "When you perform an attack against an enemy with the unit type listed, during \
		the Form Attack Pool step, you may gain X aim tokens. If you do, you may only form one attack pool \
		and skip the Declare Additional Defender step of the attack sequence.",
	"Agile": "After you perform a standard move as part of an action or free action, gain X dodge token(s). \
		Note: climbing, pivoting, and reversing are not standard moves.",
	"AI": "If you are on the battlefield, do not have a face up order token, and are not at range 3 of a commander unit, \
		you must perform one of the specified actions as its first action that activation, if able. \
		Free actions do not satisfy the requirements of AI. If you cannot perform any of the actions listed as your first action, \
		you are free to perform other actions as normal",
	"Aid": "When you would gain an aim, dodge, or surge token, another friendly unit of the affiliation or type listed at range 2 \
		and in LOS may gain that token instead. If they do, you gain 1 suppression token.",
	"Allies of Convenience": "This unit may issue orders to friendly Mercenary units regardless of affiliation\n\n.\
		During army building, you may have 1 extra Mercenary unit of any rank if you have at least one unit with this keyword. \
		You cannot exceed normal rank limits this way.",
	"Armor": "During the Modify Attack Dice step, you may cancel up to X hit results from the attack pool. \
		(Cancel all hits if no number value listed)",
	"Arsenal": "When choosing weapons during the Form Attack Pool step, each miniature in the unit that has Arsenal X \
		can contribute X weapons to attack pools.  Each weapon or combination of weapons may form a new attack pool, \
		but each weapon may only be added to one attack pool.",
	"Associate": "During Army Building you do not count your rank towards the maximum rank requirements for that rank \
		if a unit with the specified unit name is included in the same army.",
	"Ataru Mastery": "You can perform up to 2 attack actions during your activation. When you attack, \
	 	gain 1 dodge token after the attack is resolved. When defending, you gain 1 aim token after the attack is resolved.",
	"Attack Run": "At the start of your activation, you may increase or decrease your maximum speed by 1 until the end of that activation.",
	"Barrage": "If you do not use ARSENAL during your activation, you may make 2 attack actions.",
	"Block": "While defending, if you spend a dodge token during the Apply Dodge and Cover step, you gain surge to block.",
	"Bolster": "As a card action, you can choose up to X friendly units at range 2 to each 1 surge token.",
	"Bounty": "During setup, choose an enemy operative or commander unit. The chosen unit gains a bounty token. \
	 	After a friendly unit with Bounty defeats an enemy unit that has one or more bounty tokens with \
		an attack or effect, the friendly unit's controlling players scores 1 VP.",
	"Cache": "During Setup, place the listed tokens on this Upgrade Card. The unit owning the card may spend those tokens.",
	"Calculate Odds": "As a card action, you can choose a friendly trooper unit at range 2 and in LOS to gain 1 aim, 1 dodge, and 1 suppression token",
	"Charge": "After you perform a move action that brings you into base contact with an enemy miniature, \
		you may perform a free melee attack action against that unit using only melee weapons.",
	"Climbing Vehicle": "You are treated as a trooper for the purposes of climbing.",
	"Complete The Mission": "During Setup, for each friendly unit with this keyword, place a friendly \
		priority mission token on the battlefield within contested territory.\n\n\
		While a unit with the Complete the Mission keyword is at range 1 of one or more friendly priority mission tokens, it gains surge to block.\n\
		When a unit with the Complete the Mission keyword attacks an enemy unit at range 1 of one or more friendly priority mission tokens, \
		the attacking unit's attack pool gains the Critical 2 keyword.",
	"Compel": "After another friendly trooper unit at range 2 of you performs its Rally step and is suppressed but \
		not panicked, at the beginning of its Perform Action step, it may gain one suppression token to perform a free move action",
	"Contingencies": "When building a command hand, for each unit with the Contingencies X keyword in a player’s army, \
		that player sets aside up to X additional Command Cards facedown as Contingency Cards, where X is equal to the \
		combined Contingencies X value on all their units. These set-aside cards may have any number of pips but must follow \
		all other rules for constructing a command hand. Set-aside Contingency Cards are not considered to be in a player’s \
		command hand and are kept secret from an opponent. A player may look at their set-aside Contingency Cards at any time.\n\n\
		After a player reveals a Command Card, before any other effects are resolved, that player may discard that card to reveal one of \
		their set-aside Contingency Cards with an equal number of pips instead. The revealed Contingency Card is then treated as that \
		player’s selected and revealed Command Card for that turn. If both players have set-aside Contingency Cards, the blue player \
		must decide first whether or not to reveal a Contingency Card.\n\n\
		If all a player’s units with the Contingencies X keyword are defeated, a player cannot reveal or use their Contingency Cards",
	"Coordinate": "After you are issued an order, you may issue an order to a friendly unit with the name or type specified by X at range 1. \
		If a unit already has the Coordinate keyword and gains another instance of the keyword, the unit may \
		choose which targets to issue an order to from the two instances of the keyword; it does not issue two orders.",
	"Counterpart": "While building an army, this mini may be added to an X unit. (See Rulebook)",
	"Cover": "While defending against a ranged attack, improve your cover by X during the Apply Dodge and Cover step.",
	"Covert Ops": "During Setup, you may change your to Operative for the rest of the game. \
		If you do, gain Infiltrate. A unit cannot change its rank to operative if there are no other \
		Commander units in that player's army.",
	"Cunning": "When a Command Card belonging to you is revealed, if there would be a tie for priority, treat your Command Card as though it had 1 fewer pip.",
	"Danger Sense": "You may choose not to remove up to X of your suppression tokens (including 0).\n\n\
		While defending against a attack, during the Roll Defense Dice step, roll 1 extra defense die for each suppression token you have, adding up to X extra dice.",
	"Dauntless": "After you rally, if you are suppressed but not panicked, you may gain 1 suppression token to perform a free move action. A Dauntless unit cannot be affected by the Compel keyword.",
	"Death From Above": "When you attack, the defending unit cannot use cover to cancel hit results during the Apply Cover step \
	 	if the attacking unit's unit leader is overlapping a piece of non-area terrain of greater height than any terrain the \
		defending unit's unit leader is overlapping",
	"Defend": "When you are issued an order, you gain X dodge tokens.",
	"Deflect": "While defending against a ranged attack or using Guardian X, if you spend a dodge token, \
		you gain surge to block. During the Convert Defense Surges step before converting surge results, the attacker suffers \
		one wound if there is at least 1 surge result in the defense roll\n\n\
		If Deflect causes the attacking unit to be defeated, the attack continues, and the defender can still suffer wounds.\n\n\
		Deflect has no effect when defending or using Guardian X against an attack in which all weapons have High Velocity.",
	"Demoralize": "After your Rally step, add up to X total suppression tokens to enemy units at range 1-2.",
	"Detachment": "During army building, you don't count against the max number of units of your rank that can be included. \
		You may only be added if another unit without Detachment that has the name or type specified by X is also included in this army. \
		Each unit with Detachment needs its own matching specified unit. During the Deploy in Prepared Positions step, \
		you gain the Infiltrate or Prepared Position keyword if your matching specified unit has that keyword.",
	"Direct": "Each Command Phase, during the Issue Orders step, you may issue an order to a friendly unit at range 2 that has the unit name or unit type specified.",
	"Disciplined": "When you are issued an order, you may remove up to X suppression tokens.",
	"Disengage": "You may perform moves as normal while engaged with 1 enemy unit.",
	"Distract": "As a free card action, choose an enemy trooper at range 2 and in LOS. Until the end of the round, \
		when the chosen enemy unit performs an attack, it must attack this unit, if able.\n\n\
		While the chosen enemy unit is attacking you, each miniature in the enemy unit must choose \
		an eligible weapon to contribute to an attack pool. The enemy unit may only declare additional defenders and form additional \
		dice pools if, after first forming a dice pool with eligible weapons, there are still weapons usable by \
		miniatures in the unit that were not eligible to be added to the first attack pool.\n\n\
		When a unit uses Distract, if it had Inconspicuous, it loses Inconspicuous until the end of the round.",
	"Divine Influence":"While they are at range 1 of a friendly C-3PO, friendly Ewok trooper units gain Guardian 2: C-3PO. \
		While using Guardian, they may cancel crit results as if they were hit results.",
	"Djem So Mastery": "When you are defending against a melee attack, during the Compare Results step, \
		the attacking unit suffers a wound if the attack roll contains one or more blank results.",
	"Duelist": "While performing a melee attack, if you spend one or more aim tokens durring the Reroll Attack Dice step, gain Pierce 1.\n\n\
		While defending against a melee attack, if you spend one or more dodge tokens during the Apply Dodge and Cover step, gain Immune: Pierce.\n\n\
		YOu get these effects in addition to the normal effects of spending aim or dodge tokens.",
	"Enrage": "While you have X or more wound tokens, treat your courage as \"-\", gain CHARGE, and lose any suppression tokens.\
		If you remove wound tokens so that you have fewer than X, you no longer benefit from Enrage until you have X or more wounds again.",
	"Entourage": "During Army Building, you do not count one unit specified by the Entourage keyword towards the maximum rank requirements for that rank.\
		This can allow a player to bring more units of a specific rank than rank requirements allow.\n\n\
		During the Issue Orders step, a unit with Entourage keyword may issue an order to a friendly unit at range 2 with the name specified by Entourage.\n\n\
		The unit specified by the Entourage keyword ignores the corps rank requirement to provide backup to the unit with the Entourage keyword.",
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
	"Strafe":"If a unit with Hover: Ground/Air X has a base with side notches, the unit may perform a strafe move as part \
		of a move action instead of moving normally. A unit reduces its maximum speed by 1 to a minimum of 1 while performing \
		a strafe. As with other movements with notched bases, a strafe can be a full strafe or a partial strafe, and can be interrupted if \
		an object prevents the strafing miniature from fully progressing across the movement tool.\n\n\
		To perform a full strafe, place the end of a movement tool into one of the side notches on the unit’s base. Keeping the \
		movement tool in place on the battlefield, move the miniature along the movement tool until the opposite side notch is wholly \
		in the opposite end of the movement tool. While performing a strafe, a miniature’s base must not overlap terrain that it cannot \
		move through.",
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
	"Mercenary: Faction": "A unit with the Mercenary keyword is a Mercnary unit. The faction(s) specified by the Mercenary keyword\
	 	can include that unit in an army as a Mercenary unit.",
	"Nimble": "After defending, if you spent 1 or more dodge tokens, gain 1 dodge token.",
	"Observe": "Choose an enemy unit at range 3 and in LOS. It gains X Observation Tokens.",
	"Observation Token": "During an attack, a friendly attacking unit can spend any number of observation tokens on \
		the defending unit during the Reroll Attack Dice step. The attacking unit rerolls one attack die for each observation \
		token spent. Observation tokens are spent one at a time, and the same die can be rerolled by spending subsequent observation or aim tokens. \
		The attacking unit may spend observation and aim tokens in any order.", 
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
	"Relentless": "After you perform a move action, you may perform 1 free attack action.",
	"Reliable": "At the start of the Activation Phase, you gain X surge tokens.",
	
	
	
	"Reposition": "Either before or after you perform a standard move, you may perform a free pivot action.",
	"Restore": "Choose a unit, then select a mini from this unit defeated in the current round. Place that mini in cohesion with its unit leader, then give it wound tokens equal to one less than its wound threshold",
	"Retinue": "At the start of the Activation Phase, if you are at range 2 of X, gain 1 aim or dodge token. Additionally, a unit with Retinue keyword ignors the core rank requirments to provide backup to the specified unit.",
	"Ruthless": "When another friendly Corps trooper unit at range 2 and in LOS that has a faceup order token activates, it may suffer 1 wound to perform 1 free action.",
	"Sidearm Melee/Ranged": "If an upgrade has Sidearm:Melee keyword, the minatirue added by that upgraad or with that upgrade cannot add any melee weapons to attack pools other than any melee weapons on the Upgrade Card with Sidearm: Melee.  (Same effect for ranged)",
	"Scale": "When you perform a climb, you may move a vertical distance of up to height 2. Do not reduce maximum speed when moving through difficult terrain.",
	"Scatter": "After performing an attack against a trooper unit with small bases, you may move any non-leader minis in the defending unit, following the all the rules of cohesion, as if the unit leader had performed a standard move.",
	"Scout": "At the start of its Perform Actions step, it may deploy by performing a free speed X move action, ignoring difficult terrain. A unit can perform this move regardless of its maximum speed. The Scout X keyword is cumulative, but cannot exceed 3. If a unit would ever have Scout X eceeding Scout 3, it has Scout 3 instead.",
	"Scouting Party": "During Setup, a unit with Scouting Party keyword may choose up to X friendly trooper units that share the same faction or affiliation with that unit and do not have the scout keyword. Each chosen unit gains the Scout X keyword this game, where X is the Scout X value of the uint with the Scouting Pary keyword.",
	"Secret Mission": "Once per game if a unit with the Secret Mission keyword is within enemy territory, it gains a secret mission token. When scoring VP, if a player with 1 or more secret mission tokens is within enemy territory that unit scores 1 VP. Then, remove those secret mission tokens from the game.",
	"Self-Destruct": "You may perform this attack as a free action if you have at least X wound tokens. Perform this attack against all unit within range 1 and LOS, even if they are engaged. This attack my not be performed by a unit embarked on a TRANSPORT. After performing all attacks, the unit making this attack is defeated and removed from play.",
	"Self-Preservation": "When checking for panic, this unit cannot use the courage value of of units not of the same affiliation.",
	"Sentinel": "Your standby range is 1-3.",
	"Sharpshooter": "While performing a ranged attack, reduce the defender's cover by X.",
	"Shield Token": "While defending against a ranged attack, during the Apply Dodge and Cover step, a unit may flip any number of active shield tokens. For each shield token flipped this way, the defender cancels 1 hit or crit result.",
	"Shielded": "You have X shield tokens",
	"Sidearm": "While performing an attack, this mini can only use the weapon on this upgrade card if the attack type matches X.",
	"Skirmish": "Intended for use in Skirmish matches.",
	"Small": "While defending against a non-area ranged attack, ignore this mini.",
	"Smoke": "Place X smoke token(s) within range 1 and in LOS of your unit leader.",
	"Soresu Mastery": "While defending agains a ranged attack, it may reroll all of its defense dice during the Reroll Defense Dice step. Additionally, when using the Guardian X keyword, it may spend one dodge token before converitng any surges. If it does, it rerolls all of its defense dice before converting surges. Each die cannot be rerolled more than once.",
	"Special Issue": "This unit may only be included in X battleforce",
    "Speeder": "While moving, ignore terrain that is height X or lower. When at the start or end of your activation, you must perform a free compulsory move. Additionally, a notched based unit perfroms a move, it skips step 1 of notched base movement, rotating the unit leader's base. If a unit performs more than one non-compulsory move actions, it may not claim asset tokens that activation.  Additionally, a unit that has claimed an asset token can perform only one non-compulsory move actions during its activation.",
	"Spotter": "Choose X friendly units at range 2. Each unit gains an aim token.",
	"Spray": "Add this weapon's dice to the attack pool one time for each mini in the defending unit to which LOS is not blocked.",
	"Spur": "While performing a move, you may gain 1 suppression token to increase your maximum speed by 1.",
	"Stationary": "You cannot perform moves, except pivots.",
	"Steady": "After you perform a move action, you may perform a free ranged attack action.",
	"Strategize": "Gain 1 suppression token and choose X friendly units at range 2. The chosen units each gain 1 aim and 1 dodge token.",
	"Suppressive": "After you perform an attack, the defender that this weapon was used against gains 1 suppression token.",
	"Surge Token": "Spending one or more surge tokens will convert the same number of surges to blocks while defending or using using GUARDIAN, and to hits while attacking.",
	"Tactical": "After you perform a standard move, gain X aim tokens.",
	"Take Cover": "Choose X friendly trooper units at range 2. Each unit gains a dodge token.",
	"Target": "After you are issued an order, gain X aim tokens.",
	"Teamwork": "While you are at range 2 of X, when you or X gains an aim or dodge token, the other unit gains a token of the same type.",
	"Tempted": "If a friendly unit is defeated by an enemy attack and that attacking unit is at range 3 of a unit with Tempted, it may preform a speed 2 move ignoring difficutl terrain after the attack actions is resolved. A unit may use the Tempted keyword only once each round.",
	"Tow Cable": "After a vehicle is wounded by an attack that includes this weapon, the attacker performs a pivot with that vehicle.",
	"Transport":"During Setup you may choose a friendly core trooper or special forces trooper unit to transport. During the Issue Order step of the Command Phase of round1, a unit with Transport may issue an order to the chosen unit. If the chosen unit is undeployed when the Transport unit deploys, after the effect is resloved the chosen unit deploys by preforming a speed 1 move. Measure the start with both prongs of the movement tool touching the base of the Transport.",
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
	"Bane Token":"Bane tokens (\"Here I Am\", \"Smoke and Mirrors\", \"Kablamo!\") are placed facedown, they cannot overlap objective or condition tokens. When an enemy mini moves, deploys, or is placed at Range 1 with LOS to the token, the token is revealed, its effect is resolved, then the token is removed. Minis cannot overlap Bane tokens.",
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
"Overrun":"A unit may make X overrun attacks during its activation. A unit can perform an overrun attack after it makes a standard move during which one of its minis bases overlapped an enemy mini's base. After completing the move and resolving any displacement of the enemy unit, perform an attack against the unit you moved through, ignoring range. You can form only one attack pool, using only OVERRUN weapons and only adding the overrun weapon once, even if multiple minis are in the attack. If a unit has OVERRUN greater than 1, it must perform a separate move for each overrun attack.",
	"Permanent": "This card is not discarded at the End Phase, its effect persists as long as it's in play.",
	"Pierce": "While attacking, cancel up to X block results.",
"Poison": "A non-droid trooper unit suffering wounds from this weapon gains X poison tokens.",
	"Poison Token": "At the end of a unit's activation, it suffers 1 wound for each poison token it has, then discards each poison token it has. Vehicles and droid trooper units cannot gain poison tokens.",
	"Ram": "During the Modify Attack Dice step, you may change X attack die results to crit results if you performed at least 1 full standard move at max speed during the same activation as this attack.",
	"Reconfigure": "When you recover, you may flip this card. Reconfigure does not exhaust this card.",
	"Repair": "Choose a friendly droid trooper or vehicle unit at range 1 and in LOS. Place 1 wound token on this card to remove up to X wound, ion, or vehicle damage tokens from the chosen unit, or to RESTORE X minis to that unit. You cannot do this action if this card has Y wound tokens. If you have multiple Repairs, treat each as a separate ability.",


}

export default keywords;