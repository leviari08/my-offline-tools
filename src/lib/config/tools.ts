export interface NavItem {
	id: string;
	label: string;
	icon: string;
	href: string;
}

export const TOP_NAV_ITEMS: NavItem[] = [
	{ id: 'text-compare', label: 'Text Compare', icon: 'compare_arrows', href: '#/text-compare' },
	{ id: 'jwt-decoder', label: 'JWT Decoder', icon: 'enhanced_encryption', href: '#/jwt-decoder' },
	{ id: 'notebook', label: 'Notebook', icon: 'edit_note', href: '#/notebook' },
	{ id: 'base64', label: 'Base64 Encoder', icon: 'code', href: '#/base64' },
	{ id: 'json-formatter', label: 'JSON Formatter', icon: 'format_align_left', href: '#/json-formatter' },
];

export const BOTTOM_NAV_ITEMS: NavItem[] = [
	{ id: 'settings', label: 'Settings', icon: 'settings', href: '#/settings' }
];

export const ALL_NAV_ITEMS = [...TOP_NAV_ITEMS, ...BOTTOM_NAV_ITEMS];
