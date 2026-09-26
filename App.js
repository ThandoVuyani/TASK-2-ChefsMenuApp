import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert, SafeAreaView, ScrollView }
 from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  // Already loaded menu items as shown on my High fidelity frames
  const [menuItems, setMenuItems] = useState([
    {
      id: '1',
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon fillet, pan-seared and served with seasonal roasted vegetables and lemon butter sauce.',
      course: 'Main Course',
      price: '185.00',
    },
    {
      id: '2',
      description: 'Classic Italian salad with sliced fresh mozzarella, tomatoes, and sweet basil, drizzled with balsamic glaze.',
      course: 'Starter',
      price: '85.00',
    },
    {
      id: '3',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce, croutons, parmesan cheese, and Caesar dressing.',
      course: 'Starter',
      price: '75.00',
    },
    {
      id: '4',
      name: 'Beef Burger',
      description: 'Juicy grilled beef patty topped with cheddar cheese, lettuce, tomato, and onion on a toasted brioche bun.',
      course: 'Main Course',
      price: '130.00',
    },
    {
      id: '5',
      name: 'Chocolate Lava Cake',
      description: 'Warm molten chocolate cake served with a scoop of vanilla bean ice cream.',
      course: 'Dessert',
      price: '65.00',
    },
  ]);

  const addMenuItem = (newItem) => {
    setMenuItems((prevItems) => [...prevItems, { ...newItem, id: Date.now().toString() }]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Chef's Menu">
          {(props) => <MenuListScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
        <Stack.Screen name="Add New Dish">
          {(props) => <AddDishScreen {...props} addMenuItem={addMenuItem} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
        