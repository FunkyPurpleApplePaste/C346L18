import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, Image, StyleSheet, TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

let originalData = [];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232323',
        paddingVertical: 10,
    },
    label: {
        fontSize: 16,
        marginLeft: 14,
        marginBottom: 6,
        color: '#232323',
        fontWeight: '500',
    },
    searchBar: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginHorizontal: 12,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#fff',
        fontSize: 18,
        marginBottom: 12,
    },
    cardStyle: {
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: 220,
        borderRadius: 10,
        marginBottom: 10,
    },
    textStyle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#222',
        marginBottom: 6,
    },
    starsContainer: {
        flexDirection: 'row',
    },
});

const App = () => {
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        const myurl = 'https://onlinecardwebservice-ggm0.onrender.com/allchar';
        fetch(myurl)
            .then((response) => response.json())
            .then((myJson) => {
                setMyData(myJson);
                originalData = myJson;
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const FilterData = (text) => {
        if (text !== '') {
            const myFilteredData = originalData.filter((item) =>
                item.charname.toLowerCase().includes(text.toLowerCase())
            );
            setMyData(myFilteredData);
        } else {
            setMyData(originalData);
        }
    };

    const renderStars = (charstar) => {
        const rating = Math.max(0, Math.min(5, charstar / 2));
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(<FontAwesome key={i} name="star" size={22} color="#000000" />);
            } else if (i - rating < 1) {
                stars.push(<FontAwesome key={i} name="star-half-empty" size={22} color="#000000" />);
            } else {
                stars.push(<FontAwesome key={i} name="star-o" size={22} color="#000000" />);
            }
        }

        return <View style={styles.starsContainer}>{stars}</View>;
    };

    const renderItem = ({ item }) => (
        <View style={styles.cardStyle}>
            <Image style={styles.cardImage} source={{ uri: item.charpic }} />
            <Text style={styles.textStyle}>{item.charname}</Text>
            {renderStars(item.charstar)}
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.label}>Search:</Text>
            <TextInput
                style={styles.searchBar}
                placeholder="Search character..."
                onChangeText={(text) => FilterData(text)}
            />
            <FlatList
                data={myData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id?.toString()}
            />
        </View>
    );
};

export default App;
