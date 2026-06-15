const CONNECTOR_WORDS = 'of|the|and|for|from|with';

export const WOW_ICON_MEDIUM_BASE = 'https://wow.zamimg.com/images/wow/icons/medium/';

/** Spell icon filenames keyed by normalized spell name (mage talents + shared lookups). */
const SPELL_ICON_MAP: Record<string, string> = {
	'frost channeling': 'spell_frost_stun.jpg',
	'arcane torrent': 'spell_shadow_teleport.jpg',
	'master of deception': 'spell_shadow_charm.jpg',
	'mana burn': 'spell_shadow_manaburn.jpg',
	'dispel magic': 'spell_holy_dispelmagic.jpg',
	'mind flay': 'spell_shadow_siphonmana.jpg',
	'flame shock': 'spell_fire_flameshock.jpg',
	'frost shock': 'spell_frost_frostshock.jpg',
	'elemental mastery': 'spell_nature_wispheal.jpg',
	polymorph: 'spell_nature_polymorph.jpg',
	'frost nova': 'spell_frost_frostnova.jpg',
	'cold snap': 'spell_frost_wizardmark.jpg',
	frostbite: 'spell_frost_frostarmor.jpg',
	blink: 'spell_arcane_blink.jpg',
	counterspell: 'spell_frost_iceshock.jpg',
	'arcane power': 'spell_nature_lightning.jpg',
	'presence of mind': 'spell_nature_enchantarmor.jpg',
	'icy veins': 'spell_frost_coldhearted.jpg',
	frostbolt: 'spell_frost_frostbolt02.jpg',
	'arcane explosion': 'spell_nature_wispsplode.jpg',
	'fire blast': 'spell_fire_fireball.jpg',
	fireball: 'spell_fire_flamebolt.jpg',
	scorch: 'spell_fire_soulburn.jpg',
	pyroblast: 'spell_fire_fireball02.jpg',
	'summon water elemental': 'spell_frost_summonwaterelemental_2.jpg',
	'mana shield': 'spell_shadow_detectlesserinvisibility.jpg',
	impact: 'spell_fire_meteorstorm.jpg',
	'fire ward': 'spell_fire_firearmor.jpg',
	'frost ward': 'spell_frost_frostward.jpg',
	'blast wave': 'spell_holy_excorcism_02.jpg',
	'dampen magic': 'spell_nature_abolishmagic.jpg',
	'cone of cold': 'spell_frost_glacier.jpg',
	'ice barrier': 'spell_ice_lament.jpg',
	blizzard: 'spell_frost_icestorm.jpg',
	"winter's chill": 'spell_frost_chillingblast.jpg',
	'arcane focus': 'spell_holy_devotion.jpg',
	'arcane missiles': 'spell_nature_starfall.jpg',
	'wand specialization': 'inv_wand_01.jpg',
	'w and specialization': 'inv_wand_01.jpg',
	'mind mastery': 'spell_arcane_mindmastery.jpg',
	'magic absorption': 'spell_nature_astralrecalgroup.jpg',
	'arcane fortitude': 'spell_arcane_arcaneresilience.jpg',
	'prismatic cloak': 'spell_arcane_prismaticcloak.jpg',
	'arcane potency': 'spell_arcane_arcanepotency.jpg',
	'spell power': 'spell_arcane_arcanetorrent.jpg',
	slow: 'spell_nature_slow.jpg',
	ignite: 'spell_fire_incinerate.jpg',
	flamestrike: 'spell_fire_selfdestruct.jpg',
	'burning soul': 'spell_fire_fire.jpg',
	'master of elements': 'spell_fire_masterofelements.jpg',
	'playing with fire': 'spell_fire_playingwithfire.jpg',
	'blazing speed': 'spell_fire_burningspeed.jpg',
	pyromaniac: 'spell_fire_burnout.jpg',
	combustion: 'spell_fire_sealoffire.jpg',
	'molten fury': 'spell_fire_moltenblood.jpg',
	"dragon's breath": 'inv_misc_head_dragon_01.jpg',
	'elemental precision': 'spell_ice_magicdamage.jpg',
	'ice shards': 'spell_frost_iceshard.jpg',
	permafrost: 'spell_frost_wisp.jpg',
	'piercing ice': 'spell_frost_frostbolt.jpg',
	'arctic reach': 'spell_shadow_darkritual.jpg',
	'ice floes': 'spell_frost_icefloes.jpg',
	'arctic winds': 'spell_frost_arcticwinds.jpg',
	flare: 'spell_fire_flare.jpg',
	immolate: 'spell_fire_immolation.jpg',
	'mace stun effect': 'ability_thunderbolt.jpg'
};

function formatAbilityName(name: string): string {
	return name
		.replace(
			new RegExp(
				`(\\w)(${CONNECTOR_WORDS})(?=\\s|[A-Za-z]|(?:${CONNECTOR_WORDS}))`,
				'gi'
			),
			'$1 $2 '
		)
		.replace(new RegExp(`([a-z])\\b(${CONNECTOR_WORDS})\\b(?=[A-Z])`, 'g'), '$1 $2 ')
		.replace(/([A-Z])/g, ' $1')
		.trim()
		.replace(/\s+/g, ' ');
}

export function getSpellIconPath(spellName: string): string | null {
	const normalizedName = formatAbilityName(spellName.toLowerCase());
	return SPELL_ICON_MAP[normalizedName] ?? null;
}

export function getSpellIconUrl(spellName: string): string | null {
	const filename = getSpellIconPath(spellName);
	return filename ? `${WOW_ICON_MEDIUM_BASE}${filename}` : null;
}
