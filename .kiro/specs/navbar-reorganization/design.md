# Navigation Menu Reorganization Design

## Introduction

This design document specifies the architecture, components, and implementation details for the SimuTec navigation menu reorganization. The new design transforms the current 70+ link mega-menu into a clean 7-category structure with modern styling and improved mobile experience.

## Architecture Overview

### Component Structure

The navigation system follows a hierarchical component architecture:

```
NavBar (Main Container)
├── Logo Section
│   └── Brand Link
├── Desktop Navigation
│   ├── MainCategory (×7)
│   │   └── DropdownMenu
│   │       ├── SubSection Header
│   │       ├── CategoryLink (×N)
│   │       └── CourseEntry
│   └── ThemeToggle
├── Mobile Navigation
│   ├── HamburgerButton
│   └── ExpandedMobileMenu
│       ├── MobileCategorySection (×7)
│       │   └── MobileSubItem (×N)
│       └── MobileThemeToggle
└── Access Modals
    └── MobileAccessModal
```

### Design Principles

1. **Progressive Disclosure**: Main categories are always visible, detailed content appears on demand
2. **Content Chunking**: Maximum 20 items per column, organized into logical sub-sections
3. **Visual Hierarchy**: Headers, sub-headers, and links have distinct visual treatment
4. **Mobile-First**: Hamburger menu shows all categories expanded simultaneously
5. **Accessibility-First**: Full keyboard navigation and ARIA support throughout

## Component Specifications

### NavBar Component

**Responsibilities:**
- Manage global navigation state (open menus, mobile toggle)
- Handle click-outside detection to close menus
- Coordinate theme toggle functionality
- Integrate with authentication system for role-based content

**State Management:**
```jsx
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [openSubmenu, setOpenSubmenu] = useState(null); // 'cursos', 'electricidad', 'robotica', 'taller', 'recursos', 'moviles', 'gestion'
const [isMobile, setIsMobile] = useState(false);
```

**Props:**
- `theme`: Current theme mode ('light' | 'dark')
- `toggleTheme`: Callback to switch theme
- `userRole`: Current user role for role-based menu options

### Navigation Data Structure

The navigation content is organized as a configuration object:

```jsx
const NAVIGATION_STRUCTURE = {
  cursos: {
    icon: '🎓',
    label: 'Cursos',
    columns: 1,
    sections: [
      {
        type: 'course-highlight',
        items: [
          { label: 'Electricidad 1° Año', path: '/electricidad-1ro', description: '12 Semanas' },
          { label: 'Taller de Robótica', path: '/taller-robotica', description: 'Hands-on' },
          { label: 'React Native', path: '/aplicaciones-moviles', description: 'Apps Móviles' }
        ]
      },
      {
        type: 'course-details',
        label: 'Detalles del Curso',
        items: [
          { label: 'Programa', path: '/cursos/:course/programa' },
          { label: 'Evaluaciones', path: '/cursos/:course/evaluaciones' },
          { label: 'Materiales', path: '/cursos/:course/materiales' }
        ]
      }
    ]
  },
  electricidad: {
    icon: '⚡',
    label: 'Electricidad',
    columns: 2,
    sections: [
      {
        type: 'sub-header',
        label: 'Fundamentos'
      },
      { label: 'Ley de Ohm', path: '/ley-ohm' },
      { label: 'Leyes de Kirchhoff', path: '/kirchhoff' },
      { label: 'Potencia Eléctrica', path: '/potencia' },
      { label: 'Electricidad Básica', path: '/electricidad-basica' },
      { label: 'Instalaciones Domiciliarias', path: '/circuitos-domiciliarios' },
      {
        type: 'sub-header',
        label: 'Análisis de Circuitos'
      },
      { label: 'T. de Thévenin', path: '/teorema-thevenin' },
      { label: 'T. de Norton', path: '/teorema-norton' },
      { label: 'Simulador', path: '/simulador-circuitos' },
      {
        type: 'sub-header',
        label: 'Electrónica Digital'
      },
      { label: 'Sistemas de Numeración', path: '/electronica-digital/numeracion' },
      { label: 'Compuertas Lógicas', path: '/electronica-digital/compuertas' },
      { label: 'Mapas de Karnaugh', path: '/electronica-digital/karnaugh' },
      { label: 'Circuitos Secuenciales', path: '/electronica-digital/secuenciales' }
    ]
  },
  robotica: {
    icon: '🤖',
    label: 'Robótica',
    columns: 2,
    sections: [
      {
        type: 'sub-header',
        label: 'Arduino & C++'
      },
      { label: 'Introducción', path: '/arduino-intro' },
      { label: 'C/C++ Básico', path: '/cpp-basico' },
      { label: 'Señales PWM', path: '/pwm' },
      { label: 'Sensores', path: '/sensores' },
      {
        type: 'sub-header',
        label: 'ESP32 & IoT'
      },
      { label: 'Simulador ESP32', path: '/arduino/esp32-sim' },
      { label: 'Dashboards IoT', path: '/arduino/iot-dashboards' },
      { label: 'Web Designer', path: '/arduino/web-designer' },
      {
        type: 'sub-header',
        label: 'Proyectos'
      },
      { label: 'Taller de Robótica', path: '/taller-robotica' },
      { label: 'Robot Evasor', path: '/robot-evita-obstaculos' },
      { label: 'Programación Scratch', path: '/scratch' }
    ]
  },
  taller: {
    icon: '🛠️',
    label: 'Taller',
    columns: 2,
    sections: [
      {
        type: 'sub-header',
        label: 'Metrología'
      },
      { label: 'Calibre Pie de Rey', path: '/calibre' },
      { label: 'Micrómetro', path: '/micrometro' },
      { label: 'Metro de Carpintero', path: '/metro-carpintero' },
      {
        type: 'sub-header',
        label: 'Herramientas'
      },
      { label: 'Seguridad y EPP', path: '/seguridad-epp' },
      { label: 'Herramientas Electricidad', path: '/herramientas-electricidad' },
      { label: 'Herramientas Electrónica', path: '/herramientas-electronica' },
      { label: 'Carpintería', path: '/herramientas-carpinteria' },
      { label: 'Metal-Mecánica', path: '/metal-mecanica' },
      {
        type: 'sub-header',
        label: 'Dibujo Técnico'
      },
      { label: 'Normas IRAM', path: '/dibujo-tecnico/normas-iram' },
      { label: 'Proyecciones Ortogonales', path: '/dibujo-tecnico/proyecciones' },
      { label: 'Axonometrías', path: '/dibujo-tecnico/axonometrica' }
    ]
  },
  recursos: {
    icon: '📚',
    label: 'Recursos',
    columns: 1,
    sections: [
      {
        type: 'sub-header',
        label: 'Matemática & Física'
      },
      { label: 'Conversión Unidades', path: '/conversion-unidades' },
      { label: 'Teorema Pitágoras', path: '/pitagoras' },
      { label: 'Trigonometría', path: '/trigonometria' },
      { label: 'Cinemática', path: '/cinematica' },
      {
        type: 'sub-header',
        label: 'Cultura Digital'
      },
      { label: 'Generaciones Computadoras', path: '/generaciones-computadoras' },
      { label: 'Arquitectura Von Neumann', path: '/arquitectura-von-neumann' },
      { label: 'CPU Simulator', path: '/cpu-simulator' },
      { label: 'Jerarquía Memoria', path: '/memoria' },
      {
        type: 'sub-header',
        label: 'Institucionales'
      },
      { label: 'Carpeta Drive UTN', external: 'https://drive.google.com/...' },
      { label: 'Planilla Técnica', external: 'https://docs.google.com/...' }
    ]
  },
  moviles: {
    icon: '📱',
    label: 'App Móviles',
    requiresAuth: true,
    columns: 1,
    sections: [
      {
        type: 'status',
        items: [
          { label: 'Programa & Unidades', path: '/aplicaciones-moviles', status: 'unlocked' },
          { label: 'Simulador Interactivo', path: '/simulador-react-native', status: 'unlocked' }
        ]
      }
    ]
  },
  gestion: {
    icon: '📋',
    label: 'Gestión',
    roleBased: true,
    columns: 1,
    sections: []
  }
};
```

### Styling System

#### CSS Custom Properties

```css
:root {
  /* Colors */
  --brand-blue: #1A56DB;
  --brand-blue-light: rgba(26, 86, 219, 0.1);
  --brand-blue-hover: rgba(26, 86, 219, 0.15);
  
  /* Navigation */
  --nav-height: 58px;
  --nav-bg: var(--card-bg);
  --nav-border: var(--border-color);
  --nav-text-dim: var(--text-dim);
  --nav-text-main: var(--text-main);
  
  /* Dropdown */
  --dropdown-bg: var(--card-bg);
  --dropdown-border: var(--border-color);
  --dropdown-shadow: 0 8px 24px rgba(15, 23, 42, 0.1);
  --dropdown-radius: 12px;
  
  /* Mobile */
  --mobile-menu-bg: var(--card-bg);
  --mobile-menu-border: var(--border-color);
}
```

#### Desktop Dropdown Layout

```css
.dropdown-menu {
  display: none;
  position: absolute;
  top: calc(100% + 6px);
  background: var(--dropdown-bg);
  border: 1px solid var(--dropdown-border);
  border-radius: var(--dropdown-radius);
  box-shadow: var(--dropdown-shadow);
  min-width: 210px;
  max-width: calc(100vw - 2rem);
  padding: 0.75rem;
}

.dropdown-menu-2-col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 640px;
}

.dropdown:hover .dropdown-menu,
.dropdown.active .dropdown-menu {
  display: block;
}
```

#### Mobile Expanded Menu Layout

```css
@media (max-width: 991px) {
  .hamburger-menu {
    display: flex;
  }
  
  .nav-links {
    display: none;
    flex-direction: column;
    width: 100%;
    margin-top: 0.5rem;
    background: var(--mobile-menu-bg);
    border-radius: 12px;
    padding: 0.75rem;
    position: absolute;
    top: var(--nav-height);
    left: 0;
    max-height: calc(100vh - 80px);
    overflow-y: auto;
  }
  
  .nav-links.open {
    display: flex;
  }
  
  .mobile-category-section {
    margin-bottom: 0.5rem;
  }
  
  .mobile-category-header {
    padding: 0.5rem;
    font-weight: 600;
    color: var(--brand-blue);
  }
  
  .mobile-sub-items {
    padding-left: 1rem;
  }
  
  .mobile-sub-item {
    padding: 0.4rem 0.5rem;
    border-radius: 6px;
  }
}
```

## Accessibility Implementation

### ARIA Labels

```jsx
<nav role="navigation" aria-label="Main navigation">
  <button
    className="hamburger-menu"
    aria-label="Toggle navigation menu"
    aria-expanded={isMenuOpen}
    aria-controls="main-navigation"
  >
    <span className="bar"></span>
    <span className="bar"></span>
    <span className="bar"></span>
  </button>
  
  <ul id="main-navigation" role="menubar">
    <li role="none">
      <button
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={openSubmenu === 'cursos'}
        onClick={() => toggleSubmenu('cursos')}
      >
        Cursos
      </button>
      <div role="menu" aria-label="Cursos submenu">
        {/* dropdown content */}
      </div>
    </li>
  </ul>
</nav>
```

### Keyboard Navigation

```jsx
const handleKeyDown = (event, categoryKey) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      toggleSubmenu(categoryKey);
      break;
    case 'Escape':
      closeAll();
      break;
    case 'ArrowDown':
      navigateToNextMenuItem();
      break;
    case 'ArrowUp':
      navigateToPreviousMenuItem();
      break;
    case 'Tab':
      closeAll();
      break;
  }
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of the navigation system. Properties serve as formal specifications for automated testing.*

### Property 1: Hover Interaction Behavior

**For any** main category and any user session state, when the user hovers over the category for more than 50ms, the NavigationSystem SHALL display the dropdown menu for that category.

**Validates: Requirements 1.3, 5.2**

```jsx
// Test implementation pattern
test('hover shows dropdown menu', async () => {
  const user = userEvent.setup();
  render(<NavBar />);
  
  const cursosCategory = screen.getByText('Cursos');
  await user.hover(cursosCategory);
  
  expect(screen.getByText('Electricidad 1° Año')).toBeVisible();
});
```

### Property 2: Content Organization for Large Categories

**For any** category section that contains more than 20 navigation items, the NavigationSystem SHALL organize them into sub-sections with visible headers.

**Validates: Requirements 1.5, 3.1**

```jsx
// Test implementation pattern
test('large categories have sub-headers', () => {
  render(<NavBar />);
  const electricidadCategory = screen.getByText('⚡ Electricidad');
  fireEvent.mouseEnter(electricidadCategory);
  
  expect(screen.getByText('Fundamentos')).toBeInTheDocument();
  expect(screen.getByText('Análisis de Circuitos')).toBeInTheDocument();
});
```

### Property 3: Click Outside Closes Menus

**For any** open dropdown menu, when the user clicks on any element outside the navigation bar, the NavigationSystem SHALL close all open dropdown menus.

**Validates: Requirements 1.6**

```jsx
// Test implementation pattern
test('click outside closes dropdowns', async () => {
  const user = userEvent.setup();
  render(<NavBar />);
  
  // Open dropdown
  await user.click(screen.getByText('Cursos'));
  expect(screen.getByRole('menu')).toBeVisible();
  
  // Click outside
  await user.click(screen.getByTestId('main-content'));
  
  expect(screen.queryByRole('menu')).not.toBeVisible();
});
```

### Property 4: Responsive Breakpoint Detection

**For any** viewport width less than 992px, the NavigationSystem SHALL display the hamburger menu button and hide the desktop navigation links.

**Validates: Requirements 4.1**

```jsx
// Test implementation pattern
test('hamburger appears on mobile', () => {
  window.resizeTo(480, 800);
  render(<NavBar />);
  
  expect(screen.getByLabelText('Toggle navigation menu')).toBeVisible();
  expect(screen.queryByText('Cursos')).not.toBeVisible();
});
```

### Property 5: Mobile Menu Toggle

**For any** viewport width less than 992px, when the user taps the hamburger button, the NavigationSystem SHALL open the ExpandedMobileMenu showing all categories expanded.

**Validates: Requirements 4.2, 4.3**

```jsx
// Test implementation pattern
test('mobile menu opens with hamburger', async () => {
  window.resizeTo(480, 800);
  const user = userEvent.setup();
  render(<NavBar />);
  
  const hamburger = screen.getByLabelText('Toggle navigation menu');
  await user.click(hamburger);
  
  const mobileMenu = screen.getByTestId('expanded-mobile-menu');
  expect(mobileMenu).toBeVisible();
  
  // All categories should be visible
  expect(screen.getByText('🎓 Cursos')).toBeVisible();
  expect(screen.getByText('⚡ Electricidad')).toBeVisible();
  expect(screen.getByText('🤖 Robótica')).toBeVisible();
  expect(screen.getByText('🛠️ Taller')).toBeVisible();
  expect(screen.getByText('📚 Recursos')).toBeVisible();
  expect(screen.getByText('📱 App Móviles')).toBeVisible();
  expect(screen.getByText('📋 Gestión')).toBeVisible();
});
```

### Property 6: Keyboard Navigation Support

**For any** focused main category, pressing Enter SHALL open the dropdown menu, and pressing Escape SHALL close all open menus.

**Validates: Requirements 6.1, 6.2**

```jsx
// Test implementation pattern
test('keyboard navigation works', async () => {
  const user = userEvent.setup();
  render(<NavBar />);
  
  // Tab to first category
  await user.tab();
  const cursosCategory = screen.getByText('Cursos');
  expect(cursosCategory).toHaveFocus();
  
  // Press Enter to open
  await user.keyboard('{Enter}');
  expect(screen.getByText('Electricidad 1° Año')).toBeVisible();
  
  // Press Escape to close
  await user.keyboard('{Escape}');
  expect(screen.queryByText('Electricidad 1° Año')).not.toBeVisible();
});
```

### Property 7: Brand Blue Hover State

**For any** main category that is active or hovered, the NavigationSystem SHALL apply BrandBlue (#1A56DB) styling to the category label.

**Validates: Requirements 5.1, 5.2**

```jsx
// Test implementation pattern
test('hover uses brand blue', async () => {
  const user = userEvent.setup();
  render(<NavBar />);
  
  const cursosCategory = screen.getByText('Cursos').closest('button');
  
  // Check default state
  expect(cursosCategory).not.toHaveStyle({ color: '#1A56DB' });
  
  // Hover and check
  await user.hover(cursosCategory);
  expect(cursosCategory).toHaveStyle({ color: '#1A56DB' });
});
```

### Property 8: Role-Based Menu Visibility

**For any** authenticated user session, the NavigationSystem SHALL display only the Gestión options appropriate to that user's role.

**Validates: Requirements 8.1, 8.2, 8.3, 8.4**

```jsx
// Test implementation pattern
test('role-based menu visibility', () => {
  render(<NavBar userRole="student" />);
  const gestionCategory = screen.getByText('📋 Gestión');
  fireEvent.click(gestionCategory);
  
  expect(screen.getByText('Ver Calificaciones')).toBeVisible();
  expect(screen.queryByText('Gestionar Usuarios')).not.toBeVisible();
});

test('admin sees additional options', () => {
  render(<NavBar userRole="admin" />);
  const gestionCategory = screen.getByText('📋 Gestión');
  fireEvent.click(gestionCategory);
  
  expect(screen.getByText('Ver Calificaciones')).toBeVisible();
  expect(screen.getByText('Gestionar Usuarios')).toBeVisible();
  expect(screen.queryByText('Configuración Sistema')).not.toBeVisible();
});
```

## Testing Strategy

### Unit Tests

- Component rendering with different user roles
- Click handlers and state management
- CSS class application
- Icon and label rendering

### Property-Based Tests

- Dropdown visibility across all categories
- Mobile breakpoint behavior
- Keyboard navigation patterns
- Theme toggle functionality

### Integration Tests

- Full mobile navigation flow
- Role-based access control
- External link handling
- Access modal interactions

### Visual Regression Tests

- Desktop dropdown layouts (2-column vs 1-column)
- Mobile expanded menu appearance
- Hover and focus states
- Dark/light theme variations