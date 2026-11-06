# Chef's Menu App - Changelog

## [v1.4.0] - 2026-11-06
### Added
- Sorting by price
    - Price: Low → High
    - Price: High → Low
    - Clear sorting to return to default order
- Active state highlight on selected sort button

### Changed
- Menu list now uses sorted list (`sortedFiltered`) instead of filtered list

## [v1.3.0] - 2026-11-06
### Changed
- All dish prices now display in South African Rands (R)
    - Example: `185.00` → `R185.00`
    - Prices formatted to 2 decimal places using `toFixed(2)`

## [v1.2.0] - 2026-11-06
### Added
- Menu Summary Box at top of menu
    - Total Dishes: count of filtered dishes
    - Total Price: sum of filtered dish prices
    - Average Price: average of filtered dish prices
- Summary updates live when searching or filtering
    - Example (All): Total: 5 | Total Price: R540.00 | Average Price: R108.00
    - Example (Starter): Total: 2 | Total Price: R160.00 | Average Price: R80.00

### Changed
- Summary box styled with white background, bold text, stacked layout

## [v1.1.0] - 2026-11-06
### Added
- Search bar: Search menu items by name
- Filter chips: All / Starter / Main Course / Dessert
- Empty state message: "No dishes found" when no matches

## [v1.0.0] - 2026-11-06
### Added
- Initial Chef's Menu app
- Menu list with dish cards showing:
    - Name, Category, Description, Price
    - Edit and Delete buttons
- Add New Dish screen
    - Fields: Name, Description, Price, Course/Category
- Edit Dish functionality
- Delete Dish functionality
- Sample data:
    - Grilled Salmon - Main Course - R185.00
    - Classic Caprese Salad - Starter - R85.00
    - Caesar Salad - Starter - R75.00
    - Beef Burger - Main Course - R130.00
    - Chocolate Lava Cake - Dessert - R65.00

## Tech Stack
- React Native (Expo)
- JavaScript
- StyleSheet for styling
