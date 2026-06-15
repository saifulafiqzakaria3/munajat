export interface DhikrItem {
	id: string;
	arabic: string;
	transliteration: string;
	translation: string;
	defaultTarget: number;
	source?: string;
	category?: 'after-prayer' | 'morning' | 'evening' | 'before-sleep' | 'general';
}

export const DHIKR_LIST: DhikrItem[] = [
	{
		id: 'subhanallah',
		arabic: 'سُبْحَانَ اللهِ',
		transliteration: 'Subhanallah',
		translation: 'Glory be to Allah',
		defaultTarget: 33,
		source: 'Sahih Bukhari 3113',
		category: 'after-prayer'
	},
	{
		id: 'alhamdulillah',
		arabic: 'الْحَمْدُ لِلَّهِ',
		transliteration: 'Alhamdulillah',
		translation: 'All praise is for Allah',
		defaultTarget: 33,
		source: 'Sahih Bukhari 3113',
		category: 'after-prayer'
	},
	{
		id: 'allahuakbar',
		arabic: 'اللَّهُ أَكْبَرُ',
		transliteration: 'Allahu Akbar',
		translation: 'Allah is the Greatest',
		defaultTarget: 34,
		source: 'Sahih Bukhari 3113',
		category: 'after-prayer'
	}
];
