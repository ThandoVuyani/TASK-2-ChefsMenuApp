import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

const PRIMARY = '#2196F3';

export default function AddDishScreen({ onBack, onSave }) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('Main Course');
  const [error, setError] = useState('');

  const handleSave = () => {
    if(!dishName.trim() || !description.trim() || !price.trim()){
      setError('All fields are required - validation error'); return;
    }
    if(isNaN(price.replace('R','').trim())){
      setError('Price must be a number'); return;
    }
    onSave({ name: dishName, description, course, price });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.title}>← Add New Dish</Text></TouchableOpacity>
      </View>
      <ScrollView style={{backgroundColor:'#EAF0F6', flex:1}}>
        <View style={styles.form}>
          <Text style={styles.label}>Dish Name</Text>
          <TextInput style={styles.input} placeholder="Grilled Steak" value={dishName} onChangeText={setDishName}/>
          <Text style={styles.label}>Description</Text>
          <TextInput style={[styles.input,{height:90}]} placeholder="Tender sirloin served with herb butter" value={description} onChangeText={setDescription} multiline/>
          <Text style={styles.label}>Price</Text>
          <TextInput style={styles.input} placeholder="R 195.00" value={price} onChangeText={setPrice} keyboardType="decimal-pad"/>
          <Text style={styles.label}>Select Course</Text>
          <View style={{flexDirection:'row', gap:8}}>
            {['Starter','Main Course','Dessert'].map(c=>(
              <TouchableOpacity key={c} onPress={()=>setCourse(c)} style={[styles.courseBtn, course===c && {backgroundColor:PRIMARY}]}>
                <Text style={{color: course===c ? 'white' : '#607D8B', fontSize:12}}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}><Text style={styles.saveText}>Save Item</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#F0F4F8'},
  header:{backgroundColor:PRIMARY, padding:16, paddingTop:50},
  title:{color:'white', fontSize:18, fontWeight:'bold'},
  form:{padding:16}, label:{fontSize:12, color:'#607D8B', marginTop:12, marginBottom:4},
  input:{backgroundColor:'white', borderRadius:12, padding:12},
  courseBtn:{backgroundColor:'white', padding:10, borderRadius:20, borderWidth:1, borderColor:'#E0E0E0', paddingHorizontal:14},
  saveBtn:{backgroundColor:PRIMARY, borderRadius:24, padding:14, alignItems:'center', marginTop:24},
  saveText:{color:'white', fontWeight:'bold'}, error:{color:'red', marginTop:10, backgroundColor:'#FFEBEE', padding:8, borderRadius:6},
});