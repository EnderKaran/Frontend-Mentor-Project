export interface Extension {
    id: number;
    logo: string;
    name: string;
    description: string;
    isActive: boolean;
}

import logodevlens from "./extension-manager-images/logo-devlens.svg";
import logostylespy from "./extension-manager-images/logo-style-spy.svg";
import logospeedboost from "./extension-manager-images/logo-speed-boost.svg";
import logojsonwizard from "./extension-manager-images/logo-json-wizard.svg";
import logotabmasterpro from "./extension-manager-images/logo-tab-master-pro.svg";
import logoviewportbuddy from "./extension-manager-images/logo-viewport-buddy.svg";
import logomarkupnotes from "./extension-manager-images/logo-markup-notes.svg";
import logogridguides from "./extension-manager-images/logo-grid-guides.svg";
import logopalettepicker from "./extension-manager-images/logo-palette-picker.svg";
import logolinkchecker from "./extension-manager-images/logo-link-checker.svg";
import logodomsnapshot from "./extension-manager-images/logo-dom-snapshot.svg";
import logoconsoleplus from "./extension-manager-images/logo-console-plus.svg";

export const initialExtensions: Extension[] = [
    {
        id: 1,
        logo: logodevlens,
        name: "DevLens",
        description: "Quickly inspect page layouts and visualize element boundaries.",
        isActive: true
    },
    {
        id: 2,
        logo: logostylespy,
        name: "StyleSpy",
        description: "Instantly analyze and copy CSS from any webpage element.",
        isActive: true
    },
    {
        id: 3,
        logo: logospeedboost,
        name: "SpeedBoost",
        description: "Optimizes browser resource usage to accelerate page loading.",
        isActive: false
    },
    {
        id: 4,
        logo: logojsonwizard,
        name: "JSONWizard",
        description: "Formats, validates, and prettifies JSON responses in-browser.",
        isActive: true
    },
    {
        id: 5,
        logo: logotabmasterpro,
        name: "TabMaster Pro",
        description: "Organizes browser tabs into groups and sessions.",
        isActive: true
    },
    {
        id: 6,
        logo: logoviewportbuddy,
        name: "ViewportBuddy",
        description: "Simulates various screen resolutions directly within the browser.",
        isActive: false
    },
    {
        id: 7,
        logo: logomarkupnotes,
        name: "Markup Notes",
        description: "Enables annotation and notes directly onto webpages for collaborative debugging.",
        isActive: true
    },
    {
        id: 8,
        logo: logogridguides,
        name: "GridGuides",
        description: "Overlay customizable grids and alignment guides on any webpage.",
        isActive: false
    },
    {
        id: 9,
        logo: logopalettepicker,
        name: "Palette Picker",
        description: "Instantly extracts color palettes from any webpage.",
        isActive: true
    },
    {
        id: 10,
        logo: logolinkchecker,
        name: "LinkChecker",
        description: "Scans and highlights broken links on any page.",
        isActive: true
    },
    {
        id: 11,
        logo: logodomsnapshot,
        name: "DOM Snapshot",
        description: "Capture and export DOM structures quickly.",
        isActive: false
    },
    {
        id: 12,
        logo: logoconsoleplus,
        name: "ConsolePlus",
        description: "Enhanced developer console with advanced filtering and logging.",
        isActive: true
    }
];