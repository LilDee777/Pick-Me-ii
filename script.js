tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
          "on-primary-fixed": "#00164f",
          "inverse-on-surface": "#2c303a",
          "on-secondary-fixed": "#001f24",
          "tertiary-fixed-dim": "#ffba20",
          "surface-tint": "#b6c4ff",
          "tertiary-container": "#745200",
          "surface-container": "#001761",
          "error": "#ffb4ab",
          "on-secondary-container": "#00616d",
          "surface-container-highest": "#31353f",
          "secondary": "#bdf4ff",
          "surface-container-lowest": "#0a0e17",
          "on-error-container": "#ffdad6",
          "tertiary-fixed": "#ffdea8",
          "primary-fixed-dim": "#b6c4ff",
          "outline-variant": "#434655",
          "secondary-container": "#00e3fd",
          "surface-variant": "#31353f",
          "outline": "#8d90a1",
          "background": "#0f131c",
          "on-tertiary-fixed": "#271900",
          "error-container": "#93000a",
          "surface-container-low": "#181b25",
          "on-secondary": "#00363d",
          "surface": "#0f131c",
          "secondary-fixed-dim": "#00daf3",
          "on-secondary-fixed-variant": "#004f58",
          "on-primary-container": "#c2cdff",
          "primary-container": "#004ad7",
          "surface-container-high": "#262a34",
          "on-primary": "#00287d",
          "on-error": "#92040b",
          "surface-bright": "#353943",
          "on-tertiary-fixed-variant": "#5e4200",
          "on-surface-variant": "#c3c5d7",
          "on-primary-fixed-variant": "#003baf",
          "inverse-primary": "#1451dd",
          "primary-fixed": "#0e2085",
          "secondary-fixed": "#9cf0ff",
          "tertiary": "#ffba20",
          "inverse-surface": "#dfe2ef",
          "on-background": "#dfe2ef",
          "on-surface": "#dfe2ef",
          "primary": "#b6c4ff",
          "surface-dim": "#0f131c",
          "on-tertiary": "#412d00",
          "on-tertiary-container": "#ffc657"
      },
      "borderRadius": {
          "DEFAULT": "0.125rem",
          "lg": "0.25rem",
          "xl": "0.5rem",
          "full": "0.75rem"
      },
      "spacing": {
          "margin-desktop": "64px",
          "margin-mobile": "20px",
          "container-max": "1440px",
          "gutter": "24px",
          "unit": "8px"
      },
      "fontFamily": {
          "headline-lg": ["Anton"],
          "label-caps": ["JetBrains Mono"],
          "body-md": ["Sora"],
          "headline-lg-mobile": ["Anton"],
          "display-xl": ["Anton"]
      },
      "fontSize": {
          "headline-lg": ["48px", {"lineHeight": "52px", "letterSpacing": "0.02em", "fontWeight": "400"}],
          "label-caps": ["14px", {"lineHeight": "20px", "letterSpacing": "0.1em", "fontWeight": "700"}],
          "body-md": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
          "headline-lg-mobile": ["32px", {"lineHeight": "36px", "fontWeight": "400"}],
          "display-xl": ["96px", {"lineHeight": "100px", "letterSpacing": "0.04em", "fontWeight": "400"}]
      }
    }
  }
};