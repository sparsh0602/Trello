import { View, Text, StyleSheet, FlatList, Button, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import React, { Component, useState, useEffect } from 'react'

export default function BoardPage({ route, navigation }) {

    const [newCardVisibility, setnewCardVisibility] = useState('none')
    const [value, setvalue] = useState("")
    const [cardSelected, setcardSelected] = useState("")

    const [newListValue, setnewListValue] = useState("")
    const [newListVisibility, setnewListVisibility] = useState('none')
    const [listNames, setlistNames] = useState([])

    useEffect(() => {

        for (let i = 0; i < route.params.listNames.length; i++) {
            if (route.params.listNames[i].BoardName === route.params.boardTitle) {
                let arr = route.params.listNames[i].BoardCards;
                setlistNames(arr);
            }

        }

    });


    function handleCancelNewBoardButton() {
        setnewCardVisibility('none')
        setvalue("");
        setcardSelected("")
    }

    function handleNewBoardButton(cardName) {
        setnewCardVisibility('block');
        setcardSelected(cardName);

    }

    function handleCreateNewBoardButton(cardName) {
        if (value == "")
            Alert.alert("You haven't entered anything")
        else {

            for (let i = 0; i < listNames.length; i++) {
                if (listNames[i].name === cardName) {

                    let newObj={
                        "cardName":value,
                        "SubDescription":"",
                        "Description":"",
                        "Label":[],
                        "SDate":"",
                        "DDate":"",
                        "ActivityComment":""
                    }

                    let addedNewCard = [...listNames[i].cards, newObj];
                    listNames[i].cards = addedNewCard;
                    setlistNames(listNames);

                    for (let i = 0; i < route.params.listNames.length; i++) {
                        if (route.params.listNames[i].BoardName == route.params.boardName) {
                            route.params.listNames[i].BoardCards = listNames;
                            route.params.setlistNames(route.params.listNames);
                            break;
                        }
                    }
                    break;
                }
            }


            setnewCardVisibility('none');
            setvalue("");
            setcardSelected("")
        }
    }

    function handleCancelNewListButton() {
        setnewListVisibility('none')
        setnewListValue("");
    }

    function handlenewListButton() {
        setnewListVisibility('block');

    }

    function handleCreatenewListButton() {
        if (newListValue == "")
            Alert.alert("You haven't entered anything")
        else {
            listNames.splice(-1);
            let newObj = {
                "name": newListValue,
                "cards": []
            }

            let newobj2 = {
                "name": "NewList"
            }

            listNames.push(newObj);
            listNames.push(newobj2)
            setlistNames(listNames);
            setnewListVisibility('none')
            setnewListValue("");

            for (let i = 0; i < route.params.listNames.length; i++) {
                if (route.params.listNames[i].BoardName == route.params.boardName) {
                    route.params.listNames[i].BoardCards = listNames;
                    route.params.setlistNames(route.params.listNames);
                    break;
                }
            }
        }

    }



    return (
        <View style={Styles.bodyContainer}>
            <View>
                <View style={Styles.extraSpaceAtTop}>

                </View>
                <View style={Styles.header}>
                    <TouchableOpacity style={Styles.headerOtherOptionsContainer} onPress={() => { navigation.navigate('LandingPage') }}>
                        <Image source={require('Trello/components/Images/Arrow.png')} style={Styles.backArrow} />
                    </TouchableOpacity>
                    <View style={Styles.headerTextContainer}>

                        <Text style={Styles.headerText}>{route.params.boardTitle}</Text>
                    </View>
                    <View style={Styles.headerOptionsContainer}>
                        <View style={Styles.innerHeaderOptionsContainer}>
                            <Image source={require('Trello/components/Images/filter.png')} style={Styles.filterIcon} />
                        </View>

                        <View style={Styles.searchIconContainer}>
                            <Image source={require('Trello/components/Images/notificationIcon.png')} style={Styles.horizontalLines} />
                        </View>
                        <View style={Styles.notificationIconContainer}>
                            <Image source={require('Trello/components/Images/more.png')} style={Styles.horizontalLines} />
                        </View>

                    </View>
                </View>
            </View>

            <View>
                <FlatList
                    data={listNames}
                    renderItem={(element) => {
                        return (element.item.name != "NewList" ? <View style={newCardVisibility == 'none' ? Styles.cardConatiner : Styles.cardConatinerLessOpacity} >
                            <View style={Styles.cardHeaderContainer}>
                                <View style={Styles.cardHeader}>
                                    <Text style={Styles.cardHeaderTitle}>
                                        {element.item.name}
                                    </Text>
                                </View>
                                <View style={Styles.cardOptionsContainer}>
                                    <Image source={require('Trello/components/Images/Dots.png')} style={Styles.Vdots} />
                                </View>
                            </View>

                            <View>
                                {element.item.cards.length > 0 ?
                                    <FlatList
                                        data={element.item.cards}
                                        renderItem={(card) => {
                                            return (
                                                <TouchableOpacity style={Styles.cardTaskContainer} onPress={() => { navigation.navigate('CardPage', { list:element.item.name,cardTitle: card.item.cardName, boardTitle: route.params.boardTitle, listNames: route.params.listNames, setlistNames: route.params.setlistNames }) }}>
                                                    <Text style={Styles.cardTaskTitle}>{card.item.cardName}</Text>
                                                </TouchableOpacity>

                                            )
                                        }}>

                                    </FlatList> : ""
                                }
                            </View>
                            <View style={Styles.cardAddNewTaskContainer}>
                                <TouchableOpacity onPress={() => { handleNewBoardButton(element.item.name) }}><Text style={Styles.cardAddNewTaskTitle}>+ Add Card</Text></TouchableOpacity>
                            </View>
                        </View>
                            :
                            <View>
                                <TouchableOpacity onPress={() => { handlenewListButton() }}>
                                    <View style={Styles.addNewListContainer}>
                                        <Text style={Styles.newListButtonText}>&#10753; Add New List</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )

                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >

                </FlatList>

            </View>


            <View style={newCardVisibility != 'none' ? Styles.newCardInfoContainer : Styles.newCardInfoContainerNone}>
                <View style={Styles.cardInfoTitle}>
                    <Text style={Styles.cardInfoTitleText}>Create New Card</Text>
                </View>
                <View style={Styles.cardInfoInput}>
                    <View style={Styles.inputBox}>
                        <TextInput
                            editable
                            multiline
                            numberOfLines={4}
                            style={{ padding: 5 }}
                            maxLength={80}
                            onChangeText={text => setvalue(text)}
                            value={value}

                        />
                    </View>
                </View>
                <View style={Styles.cardInfoInputButtons}>

                    <TouchableOpacity style={Styles.cancelButtonConatiner} onPress={() => handleCancelNewBoardButton()}>
                        <Text style={Styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={Styles.createButtonContainer} onPress={() => handleCreateNewBoardButton(cardSelected)}>
                        <Text style={Styles.buttonText}>Add to {cardSelected}</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={newListVisibility != 'none' ? Styles.newCardInfoContainer : Styles.newCardInfoContainerNone}>
                <View style={Styles.cardInfoTitle}>
                    <Text style={Styles.cardInfoTitleText}>Create New Card</Text>
                </View>
                <View style={Styles.cardInfoInput}>
                    <View style={Styles.inputBox}>
                        <TextInput
                            editable
                            multiline
                            numberOfLines={4}
                            style={{ padding: 5 }}
                            maxLength={80}
                            onChangeText={text => setnewListValue(text)}
                            value={newListValue}

                        />
                    </View>
                </View>
                <View style={Styles.cardInfoInputButtons}>

                    <TouchableOpacity style={Styles.cancelButtonConatiner} onPress={() => handleCancelNewListButton()}>
                        <Text style={Styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={Styles.createButtonContainer} onPress={() => handleCreatenewListButton(cardSelected)}>
                        <Text style={Styles.buttonText}>Add New List</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    extraSpaceAtTop: {
        display: 'flex',
        backgroundColor: '#034694',
        minHeight: '3%',
    },
    header: {
        display: 'flex',
        backgroundColor: '#034694',
        minHeight: '7%',
        minwidth: '100%',
        flexDirection: 'row'
    },
    headerOtherOptionsContainer: {
        width: '20%',
        // backgroundColor: 'yellow',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTextContainer: {
        width: '40%',
        // backgroundColor: 'purple',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'

    },
    headerText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500'
    },
    headerOptionsContainer: {
        width: '40%',
        // backgroundColor: 'pink',
        display: 'flex',
        flexDirection: 'row',
    },
    innerHeaderOptionsContainer: {
        width: '30%',
        // backgroundColor:'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    searchIconContainer: {
        width: '30%',
        // backgroundColor:'yellow',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    horizontalLines: {
        height: 20,
        width: 20,

    },
    backArrow: {
        height: 15,
        width: 30,
    },
    notificationIconContainer: {
        width: '30%',
        // backgroundColor:'pink',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyContainer: {
        backgroundColor: '#006fb1',
        height: '100%'
    },
    filterIcon: {
        height: 15,
        width: 15,
    },
    cardConatiner: {
        width: 250,
        minHeight: 50,
        backgroundColor: 'hsl(210,8%,85%)',
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 3,



    },
    cardConatinerLessOpacity: {
        width: 250,
        minHeight: 50,
        backgroundColor: 'hsl(210,8%,85%)',
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 3,
        opacity: 0.7
    },
    cardHeader: {
        width: '50%',
        height: 25,
        display: 'flex',
        // backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'flex-start',
        left: 10,
        marginTop: 10
    },
    cardHeaderTitle: {
        fontSize: 13,
        color: '#36454F',
        fontWeight: '600'
    },
    cardOptionsContainer: {
        width: '12%',
        // backgroundColor: 'red',
        height: 20,
        marginLeft: '38%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    cardHeaderContainer: {
        display: 'flex',
        flexDirection: 'row',

    },
    Vdots: {
        width: 17,
        height: 17
    },
    cardTaskContainer: {
        width: '90%',
        backgroundColor: 'white',
        left: '5%',
        marginTop: 10,
        marginBottom: 10
    },
    cardAddNewTaskContainer: {
        width: '90%',

        left: '5%',
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    cardTaskTitle: {
        left: '5%',
        color: '#36454F',
        fontWeight: '500',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        width: '90%'
    },
    cardAddNewTaskTitle: {
        color: 'green',
        fontWeight: '500',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        fontSize: 12
    },

    newCardInfoContainer: {
        width: '70%',
        height: '20%',
        position: 'absolute',
        backgroundColor: 'rgb(246, 248, 250)',
        borderRadius: 10,
        top: '37.5%',
        display: 'block',
        borderWidth: 1,
        borderColor: 'grey',
        left: '15%'

    },

    newCardInfoContainerNone: {
        display: 'none',


    },
    cardInfoTitle: {
        height: '25%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center'
    },
    cardInfoTitleText: {
        fontSize: 15,
        fontWeight: '500',
        color: 'black',
        left: 10
    },
    cardInfoInput: {
        height: '40%',
        // backgroundColor: 'pink'
    },
    inputBox: {
        borderWidth: 1,
        borderColor: 'black',
        width: '90%',
        left: 10
    },
    cardInfoInputButtons: {
        height: '35%',
        // backgroundColor: 'yellow',
        display: 'flex',
        flexDirection: 'row'
    },
    cancelButtonConatiner: {
        width: '40%',
        backgroundColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white'
    },
    createButtonContainer: {
        width: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#034694',
    },
    addNewListContainer: {
        width: 200,
        height: 50,
        backgroundColor: '#3a3a3a',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    newListButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600'
    }

})


