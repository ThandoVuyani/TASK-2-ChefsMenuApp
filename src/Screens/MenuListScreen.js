import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, SafeAreaView } from 'react-native';

const PRIMARY = '#2196F3';

export default function MenuListScreen({ menuItems, onAddPress }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

  const filtered = filter === 'All' ? menuItems : menuItems.filter(i => 
    i.course.includes(filter) || (filter==='Mains' && i.course==='Main Course') || (filter==='Starters' && i.course==='Starter')
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chef's Menu</Text>
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

      {filtered.length===0 ? (
        <View style={styles.empty}><Text>No menu items have been added yet.</Text></View>
      ) : (
        <FlatList data={filtered} keyExtractor={i=>i.id} contentContainerStyle={{paddingBottom:100}}
          renderItem={({item})=>(
            <View style={styles.card}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardPrice}>{item.price}</Text>
              </View>
              <View style={styles.badge}><Text style={styles.badgeText}>{item.course}</Text></View>
              <Text style={styles.cardDesc}>{item.description}</Text>
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
  empty:{padding:30, alignItems:'center', marginTop:50}
});