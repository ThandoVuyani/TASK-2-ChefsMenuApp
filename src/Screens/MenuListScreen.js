import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, SafeAreaView, TextInput } from 'react-native';

const PRIMARY = '#2196F3';

export default function MenuListScreen({ menuItems, onAddPress, onDelete, navigation }) {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const filters = ['All', 'Starter', 'Main Course', 'Dessert'];

  const filtered = menuItems.filter(item => {
    const itemName = (item.name || '').toLowerCase();
    const itemDescription = (item.description || '').toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch = itemName.includes(query) || itemDescription.includes(query);
    const matchesFilter = filter === 'All' || item.course === filter;

    return matchesSearch && matchesFilter;
  });
//-- Total Menu Price & Average Price Calculation --//
  const totalMenuPrice = filtered.reduce((total, item) => {
    const price = parseFloat(String(item.price || 0).replace('R', '').trim()) || 0;
    return total + price;
  }, 0);
  const averagePrice = filtered.length > 0 ? (totalMenuPrice / filtered.length).toFixed(2) : 0.00;
    

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chef's Menu</Text>
        <TextInput
          placeholder="Search menu items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop:12}}>
          <View style={{flexDirection:'row'}}>
            {filters.map(f=>(
              <TouchableOpacity key={f} onPress={()=>setFilter(f)} style={[styles.chip, filter===f && styles.chipActive]}>
                <Text style={[styles.chipText, filter===f && {color:PRIMARY, fontWeight:'bold'}]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>Total: {filtered.length}</Text>
        <Text style={styles.summaryText}>Total Price: R{totalMenuPrice.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Average Price: R{averagePrice}</Text>
      </View>

      {filtered.length===0 ? (
        <View style={styles.empty}><Text>No menu items have been added yet.</Text></View>
      ) : (
        <FlatList data={filtered} keyExtractor={i=>i.id} contentContainerStyle={{paddingBottom:100}}
          renderItem={({item})=>(
            <View>
              <View style={styles.card}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <Text style={styles.cardPrice}>{item.price}</Text>
                </View>
                <View style={styles.badge}><Text style={styles.badgeText}>{item.course}</Text></View>
                <Text style={styles.cardDesc}>{item.description}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:6, marginRight:12}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Add New Dish', {itemToEdit: item})} style={{marginRight:12}}>
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>onDelete(item.id)}>
                  <Text style={{color:'red'}}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={onAddPress}>
        <Text style={styles.fabText}>Add New Dish +</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#F0F4F8'},
  header:{backgroundColor:PRIMARY, padding:16, paddingTop:50},
  title:{color:'white', fontSize:18, fontWeight:'bold'},
  chip:{backgroundColor:'#64B5F6', paddingHorizontal:14, paddingVertical:6, borderRadius:20, marginRight:8},
  chipActive:{backgroundColor:'white'}, chipText:{color:'white', fontSize:12},
  card:{backgroundColor:'white', marginHorizontal:12, marginVertical:5, padding:12, borderRadius:6},
  cardName:{fontWeight:'bold', color:'#424242'}, cardPrice:{fontWeight:'bold', color:'#757575'},
  badge:{backgroundColor:'#E3F2FD', alignSelf:'flex-start', borderRadius:12, paddingHorizontal:8, paddingVertical:2, marginTop:6},
  badgeText:{fontSize:11}, cardDesc:{fontSize:12, color:'#616161', marginTop:6},
  fab:{position:'absolute', bottom:24, alignSelf:'center', backgroundColor:PRIMARY, borderRadius:24, padding:12, paddingHorizontal:20},
  fabText:{color:'white', fontWeight:'bold'},
  empty:{padding:30, alignItems:'center', marginTop:50},
  summaryBox:{backgroundColor:'white', marginHorizontal:12, marginTop:12, padding:12, borderRadius:6, flexDirection:'column', gap:2, justifyContent:'space-between', marginBottom:6},
  summaryText:{fontWeight:'bold', color:'#424242'},
  searchInput:{backgroundColor:'white', borderRadius:6, paddingHorizontal:12, marginTop:12, height:40}
});