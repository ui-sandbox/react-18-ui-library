import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './stories/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Brand */
        primary:              'var(--color-primary)',
        'primary-hover':      'var(--color-primary-hover)',
        'primary-active':     'var(--color-primary-active)',
        'primary-subtle':     'var(--color-primary-subtle)',
        'primary-foreground': 'var(--color-primary-foreground)',

        secondary:              'var(--color-secondary)',
        'secondary-hover':      'var(--color-secondary-hover)',
        'secondary-foreground': 'var(--color-secondary-foreground)',

        /* Canvas */
        background:      'var(--color-background)',
        surface:         'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
        'surface-raised':'var(--color-surface-raised)',

        /* Borders */
        border:        'var(--color-border)',
        'border-strong':'var(--color-border-strong)',
        'border-focus': 'var(--color-border-focus)',

        /* Text */
        text:           'var(--color-text)',
        'text-muted':   'var(--color-text-muted)',
        'text-subtle':  'var(--color-text-subtle)',
        'text-disabled':'var(--color-text-disabled)',
        'text-inverse': 'var(--color-text-inverse)',
        'text-link':    'var(--color-text-link)',

        /* Semantic */
        error:           'var(--color-error)',
        'error-hover':   'var(--color-error-hover)',
        'error-bg':      'var(--color-error-bg)',
        'error-border':  'var(--color-error-border)',

        success:          'var(--color-success)',
        'success-hover':  'var(--color-success-hover)',
        'success-bg':     'var(--color-success-bg)',
        'success-border': 'var(--color-success-border)',

        warning:          'var(--color-warning)',
        'warning-hover':  'var(--color-warning-hover)',
        'warning-bg':     'var(--color-warning-bg)',
        'warning-border': 'var(--color-warning-border)',

        info:          'var(--color-info)',
        'info-hover':  'var(--color-info-hover)',
        'info-bg':     'var(--color-info-bg)',
        'info-border': 'var(--color-info-border)',

        /* Overlay */
        overlay: 'var(--color-overlay)',

        /* Navbar */
        navbar:             'var(--color-navbar)',
        'navbar-border':    'var(--color-navbar-border)',
        'navbar-text':      'var(--color-navbar-text)',
        'navbar-text-muted':'var(--color-navbar-text-muted)',

        /* Sidebar */
        sidebar:              'var(--color-sidebar)',
        'sidebar-header':     'var(--color-sidebar-header)',
        'sidebar-text':       'var(--color-sidebar-text)',
        'sidebar-text-hover': 'var(--color-sidebar-text-hover)',
        'sidebar-active':     'var(--color-sidebar-active)',
        'sidebar-active-bg':  'var(--color-sidebar-active-bg)',
        'sidebar-border':     'var(--color-sidebar-border)',
        'sidebar-icon':       'var(--color-sidebar-icon)',

        /* Accents */
        'accent-violet':  'var(--color-accent-violet)',
        'accent-teal':    'var(--color-accent-teal)',
        'accent-rose':    'var(--color-accent-rose)',
        'accent-amber':   'var(--color-accent-amber)',
        'accent-cyan':    'var(--color-accent-cyan)',
        'accent-emerald': 'var(--color-accent-emerald)',
      },
      borderRadius: {
        xs:      'var(--radius-xs)',
        sm:      'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md:      'var(--radius-md)',
        lg:      'var(--radius-lg)',
        xl:      'var(--radius-xl)',
        '2xl':   'var(--radius-2xl)',
        full:    'var(--radius-full)',
      },
      fontFamily: {
        base:    ['var(--font-family-base)'],
        mono:    ['var(--font-family-mono)'],
        display: ['var(--font-family-display)'],
      },
      fontSize: {
        '2xs': ['var(--font-size-2xs)', { lineHeight: '1rem' }],
        xs:    ['var(--font-size-xs)',   { lineHeight: '1rem' }],
        sm:    ['var(--font-size-sm)',   { lineHeight: '1.25rem' }],
        base:  ['var(--font-size-base)', { lineHeight: '1.5rem' }],
        lg:    ['var(--font-size-lg)',   { lineHeight: '1.75rem' }],
        xl:    ['var(--font-size-xl)',   { lineHeight: '1.75rem' }],
        '2xl': ['var(--font-size-2xl)', { lineHeight: '2rem' }],
        '3xl': ['var(--font-size-3xl)', { lineHeight: '2.25rem' }],
        '4xl': ['var(--font-size-4xl)', { lineHeight: '2.5rem' }],
        '5xl': ['var(--font-size-5xl)', { lineHeight: '1' }],
      },
      letterSpacing: {
        tight:   'var(--letter-spacing-tight)',
        normal:  'var(--letter-spacing-normal)',
        wide:    'var(--letter-spacing-wide)',
        wider:   'var(--letter-spacing-wider)',
        widest:  'var(--letter-spacing-widest)',
      },
      spacing: {
        unit: 'var(--spacing-unit)',
      },
      boxShadow: {
        xs:      'var(--shadow-xs)',
        sm:      'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md:      'var(--shadow-md)',
        lg:      'var(--shadow-lg)',
        xl:      'var(--shadow-xl)',
        '2xl':   'var(--shadow-2xl)',
        inner:   'var(--shadow-inner)',
        focus:   'var(--shadow-focus)',
        'focus-error': 'var(--shadow-focus-error)',
      },
      transitionDuration: {
        fast:    'var(--transition-fast)',
        DEFAULT: 'var(--transition-speed)',
        slow:    'var(--transition-slow)',
      },
      transitionTimingFunction: {
        DEFAULT: 'var(--transition-easing)',
        spring:  'var(--transition-spring)',
        'ease-in':  'var(--transition-ease-in)',
        'ease-out': 'var(--transition-ease-out)',
      },
      zIndex: {
        base:     'var(--z-base)',
        raised:   'var(--z-raised)',
        dropdown: 'var(--z-dropdown)',
        sticky:   'var(--z-sticky)',
        sidebar:  'var(--z-sidebar)',
        navbar:   'var(--z-navbar)',
        modal:    'var(--z-modal)',
        toast:    'var(--z-toast)',
        tooltip:  'var(--z-tooltip)',
        max:      'var(--z-max)',
      },
    },
  },
  plugins: [],
}

export default config
