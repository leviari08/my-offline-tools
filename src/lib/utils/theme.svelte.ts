const THEME_LOCAL_STORAGE_KEY = 'theme';

class ThemeService {
	isDark = $state(false);

	initTheme() {
		const savedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
		if (savedTheme) {
			this.isDark = savedTheme === 'dark';
		} else {
			this.isDark = document.documentElement.classList.contains('dark') ||
				(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
		}

		this.applyTheme();
	}

	toggleTheme() {
		this.isDark = !this.isDark;
		this.applyTheme();
		localStorage.setItem(THEME_LOCAL_STORAGE_KEY, this.isDark ? 'dark' : 'light');
	}

	private applyTheme() {
		if (this.isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
}

export const themeService = new ThemeService();
