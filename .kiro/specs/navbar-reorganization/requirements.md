# Navigation Menu Reorganization Requirements

## Introduction

This document defines the requirements for reorganizing the SimuTec navigation menu from the current mega-menu structure (70+ links in 3 columns) to a more intuitive 7-category structure with clean spacing and modern visual design.

## Glossary

- **NavigationSystem**: The complete navigation bar component and all its sub-menus
- **MainCategories**: The 7 top-level menu items: Cursos, Electricidad, Robótica, Taller, Recursos, App Móviles, Gestión
- **CourseDetails**: Sub-menu items for courses including Programa, Evaluaciones, Materiales
- **ExpandedMobileMenu**: The mobile hamburger menu with all categories fully visible
- **BrandBlue**: The institutional color #1A56DB used for branding elements

## Requirements

### Requirement 1: Main Navigation Structure

**User Story:** As a student, I want a clear and intuitive navigation structure so that I can quickly find educational content without getting overwhelmed by too many options.

#### Acceptance Criteria

1. THE NavigationSystem SHALL display exactly 7 main categories in the desktop navigation bar
2. THE 7 main categories SHALL be: Cursos, Electricidad, Robótica, Taller, Recursos, App Móviles, Gestión
3. WHEN a user hovers over a main category THEN the NavigationSystem SHALL display a dropdown menu with sub-categories
4. THE dropdown menu for each category SHALL not exceed 2 columns of content
5. WHERE the category has more than 20 links THEN the NavigationSystem SHALL organize them into logical sub-sections with headers
6. WHEN a user clicks outside an open dropdown THEN the NavigationSystem SHALL close all open menus

### Requirement 2: Courses Category

**User Story:** As a student, I want easy access to my course materials and related information so that I can navigate my learning journey effectively.

#### Acceptance Criteria

1. WHEN the user opens the Cursos dropdown THEN the NavigationSystem SHALL display the 3 main courses as prominent entries
2. THE 3 main courses SHALL be: Electricidad 1° Año, Taller de Robótica, React Native
3. BELOW the 3 main courses the NavigationSystem SHALL display course details sub-items
4. THE course details sub-items SHALL include: Programa, Evaluaciones, Materiales
5. WHEN a user clicks on Electricidad 1° Año THEN the NavigationSystem SHALL navigate to the electricity course page
6. WHEN a user clicks on Programa THEN the NavigationSystem SHALL navigate to the appropriate program/syllabus page for the selected course

### Requirement 3: Educational Content Categories

**User Story:** As a technical student, I want content organized by discipline so that I can focus on my specific area of study.

#### Acceptance Criteria

1. THE Electricidad category SHALL contain sub-sections for: Fundamentos, Análisis de Circuitos, Electrónica Digital, Laboratorio
2. THE Robótica category SHALL contain sub-sections for: Arduino & C++, ESP32 & IoT, Proyectos Prácticos
3. THE Taller category SHALL contain sub-sections for: Metrología, Herramientas, Dibujo Técnico, Fabricación
4. THE Recursos category SHALL contain sub-sections for: Matemática & Física, Cultura Digital, Enlaces Institucionales
5. WHEN a user hovers over Electricidad THEN the NavigationSystem SHALL display 2 columns with organized content
6. WHEN a user hovers over Robótica THEN the NavigationSystem SHALL display 2 columns with organized content
7. WHEN a user hovers over Taller THEN the NavigationSystem SHALL display 2 columns with organized content

### Requirement 4: Mobile Navigation Experience

**User Story:** As a mobile user, I want a clear and accessible navigation menu so that I can browse content easily on my phone or tablet.

#### Acceptance Criteria

1. WHEN the viewport width is less than 992px THEN the NavigationSystem SHALL display a hamburger menu button
2. WHEN the user taps the hamburger button THEN the NavigationSystem SHALL open the ExpandedMobileMenu
3. THE ExpandedMobileMenu SHALL display all 7 main categories expanded simultaneously
4. EACH expanded category SHALL show its sub-items immediately without requiring additional taps
5. THE ExpandedMobileMenu SHALL scroll vertically within the viewport
6. WHEN a user taps on a main category THEN the NavigationSystem SHALL scroll to that section within the menu
7. WHEN a user taps on a sub-item THEN the NavigationSystem SHALL navigate to the target page and close the menu
8. WHERE the user taps outside the ExpandedMobileMenu THEN the NavigationSystem SHALL close the menu

### Requirement 5: Visual Design and Branding

**User Story:** As a returning student, I want a familiar and professional interface so that I feel confident using the platform.

#### Acceptance Criteria

1. THE NavigationSystem SHALL use BrandBlue (#1A56DB) for primary branding elements
2. THE main category labels SHALL use BrandBlue when active or hovered
3. WHERE the user has not interacted with the menu THEN the navigation SHALL use subtle backgrounds and clear text hierarchy
4. THE NavigationSystem SHALL maintain the existing logo placement on the left side
5. WHEN displaying category headers within dropdowns THEN the NavigationSystem SHALL use a subtle bottom border with BrandBlue accent
6. WHERE sub-headers exist THEN the NavigationSystem SHALL display them with uppercase text and reduced font size
7. THE NavigationSystem SHALL maintain the existing theme toggle (light/dark mode) functionality

### Requirement 6: Accessibility and Performance

**User Story:** As a user with accessibility needs, I want a navigable interface that works with assistive technologies.

#### Acceptance Criteria

1. THE NavigationSystem SHALL support keyboard navigation using Tab and Enter keys
2. WHEN a main category has focus THEN pressing Enter SHALL open the dropdown menu
3. WHERE a dropdown is open THEN pressing Escape SHALL close all open menus
4. THE NavigationSystem SHALL include proper ARIA labels for all interactive elements
5. WHERE the user opens a dropdown menu THEN the navigation SHALL respond within 100ms
6. WHEN the page content loads THEN the NavigationSystem SHALL not block the main thread
7. WHERE the viewport resizes dynamically THEN the NavigationSystem SHALL adapt layout within 50ms

### Requirement 7: Mobile Applications Category

**User Story:** As a React Native student, I want protected access to my course materials so that my learning progress is secure.

#### Acceptance Criteria

1. THE App Móviles category SHALL remain password-protected as in the current implementation
2. WHEN a user without access clicks on App Móviles THEN the NavigationSystem SHALL display the access modal
3. WHERE the user has unlocked the mobile course THEN the NavigationSystem SHALL show unlocked status indicator
4. THE access modal SHALL function identically to the current MobileAccessGate implementation
5. WHERE the course is unlocked THEN the NavigationSystem SHALL display Programa and Simulador options
6. WHEN the user locks the course THEN the NavigationSystem SHALL update the UI to reflect locked status

### Requirement 8: Gestión Category

**User Story:** As an administrator, I want role-based access to management functions so that I can perform administrative tasks securely.

#### Acceptance Criteria

1. THE Gestión category SHALL display different options based on user role
2. WHERE the user is a student THEN the Gestión dropdown SHALL show Academic options only
3. WHERE the user is an administrator THEN the Gestión dropdown SHALL show additional administrative functions
4. WHERE the user is a director THEN the Gestión dropdown SHALL show all available management options
5. THE NavigationSystem SHALL integrate with the existing authentication system
6. WHEN the user logs in or out THEN the Gestión options SHALL update accordingly