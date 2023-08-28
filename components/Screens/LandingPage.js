import { View, Text, StyleSheet, FlatList, Button, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import DialogInput from 'react-native-dialog-input';
import { useState } from 'react'
import React from 'react'

export default function LandingPage({ navigation }) {
    const [boards, setboards] = useState([])
    const [visible, setVisible] = React.useState(false);
    const [input, setInput] = React.useState('');
    const [newCardVisibility, setnewCardVisibility] = useState('none')
    const [value, setvalue] = useState("")
    const [iconPopup, seticonPopup] = useState(false)

    const [listNames, setlistNames] = useState([
        {
            "BoardName": "Checking-Functionality",
            "BoardCards": [{
                "name": "To-Do",
                "cards": []
            },
            {
                "name": "Doing",
                "cards": []
            },
            {
                "name": "Done",
                "cards": []
            },
            {
                "name": "NewList"
            }]

        }
    ])

    function handleCancelNewBoardButton() {
        setnewCardVisibility('none')
        setvalue("");
    }

    function handleNewBoardButton() {
        seticonPopup(false)
        setnewCardVisibility('block')
    }

    function handleCreateNewBoardButton() {
        if (value == "")
            Alert.alert("You haven't entered anything")
        else {
            let newBoard = {
                "BoardName": value,
                "BoardCards": [{
                    "name": "To-Do",
                    "cards": []
                },
                {
                    "name": "Doing",
                    "cards": []
                },
                {
                    "name": "Done",
                    "cards": []
                },
                {
                    "name": "NewList"
                }]
            }
            setlistNames([...listNames, newBoard])
            setnewCardVisibility('none');
            setvalue("");



        }
    }
    function handleNewCardButton() {
        Alert.alert("You can add card by clicking on the board, You want to add your card to.")
    }

    function handlePopUpIocons() {
        seticonPopup(!iconPopup)
    }

    function CallBoardPage(boardName) {
        navigation.navigate('BoardPage', { boardTitle: boardName, listNames: listNames, setlistNames: setlistNames })
    }
    return (
        <View style={Styles.bodyContainer}>
            <View>
                <View style={Styles.extraSpaceAtTop}>

                </View>
                <View style={Styles.header}>
                    <View style={Styles.headerOtherOptionsContainer}>
                        <Image source={require('Trello/components/Images/horizontalLines.jpg')} style={Styles.horizontalLines} />
                    </View>
                    <View style={Styles.headerTextContainer}>

                        <Text style={Styles.headerText}>Boards</Text>
                    </View>
                    <View style={Styles.headerOptionsContainer}>
                        <View style={Styles.innerHeaderOptionsContainer}>
                        </View>

                        <View style={Styles.searchIconContainer}>
                            <Image source={require('Trello/components/Images/searchIcon.png')} style={Styles.horizontalLines} />
                        </View>
                        <View style={Styles.notificationIconContainer}>
                            <Image source={require('Trello/components/Images/notificationIcon.png')} style={Styles.horizontalLines} />
                        </View>

                    </View>
                </View>
            </View>

            <View style={Styles.boardArea}>
                <View style={Styles.boardAreaHeader}>
                    <Text style={Styles.boardAreaHeaderText}>Your WorkSpace</Text>
                </View>
                {listNames.length != 0 ? <FlatList
                    data={listNames}
                    renderItem={(element) => {
                        return <TouchableOpacity style={Styles.boardItemContainer} onPress={() => { CallBoardPage(element.item.BoardName) }}>

                            <View style={Styles.boardItemColoredSquare}>
                                <View style={Styles.boardItemBlueBox}>
                                </View>
                            </View>
                            <View style={Styles.boardItemName}>
                                <Text style={Styles.boardItem}> {element.item.BoardName}</Text>
                            </View>
                        </TouchableOpacity>
                    }}
                /> :
                    <TouchableOpacity onPress={() => { handleNewBoardButton() }} style={Styles.boardItemContainer}>

                        <View style={Styles.BoardItemAddSymbol}>
                            <View>
                                <TouchableOpacity><Text>&#8853;</Text></TouchableOpacity>
                            </View>
                        </View>
                        <View style={Styles.boardItemName}>
                            <Text style={Styles.boardItem}>Create Your Board</Text>
                        </View>
                    </TouchableOpacity >

                }
            </View>

            <View style={Styles.addMoreContainer}>
                <TouchableOpacity onPress={() => handlePopUpIocons()}>

                    <Image source={require('Trello/components/Images/addNewBoardIcon.png')} style={Styles.addBoardButtonIcon} />
                </TouchableOpacity>
            </View>


            <TouchableOpacity onPress={() => handleNewBoardButton()} style={Styles.outterIconsContainer}>
                <View style={iconPopup == true ? Styles.iconsContainer : Styles.hideIcons}><Text style={Styles.iconText}>Board</Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNewCardButton()} style={Styles.outterIconsCardContainer}>
                <View style={iconPopup == true ? Styles.iconsContainer : Styles.hideIcons}><Text style={Styles.iconText}>Card</Text></View>
            </TouchableOpacity>


            <View style={newCardVisibility != 'none' ? Styles.newCardInfoContainer : Styles.newCardInfoContainerNone}>
                <View style={Styles.cardInfoTitle}>
                    <Text style={Styles.cardInfoTitleText}>Enter Board Name</Text>
                </View>
                <View style={Styles.cardInfoInput}>
                    <View style={Styles.inputBox}>
                        <TextInput
                            editable
                            multiline
                            numberOfLines={4}
                            maxLength={40}
                            onChangeText={text => setvalue(text)}
                            value={value}
                            style={{ padding: 10 }}
                        />
                    </View>
                </View>
                <View style={Styles.cardInfoInputButtons}>

                    <TouchableOpacity style={Styles.cancelButtonConatiner} onPress={() => handleCancelNewBoardButton()}>
                        <Text style={Styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={Styles.createButtonContainer} onPress={() => handleCreateNewBoardButton()}>
                        <Text style={Styles.buttonText}>Create New Board</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>

    )

}

const Styles = StyleSheet.create({
    extraSpaceAtTop: {
        display: 'flex',
        backgroundColor: '#006fb1',
        minHeight: '3%',
    },
    header: {
        display: 'flex',
        backgroundColor: '#006fb1',
        minHeight: '7%',
        minwidth: '100%',
        flexDirection: 'row'
    },
    bodyContainer: {
        backgroundColor: 'white',
        height: '100%'
    },
    headerOtherOptionsContainer: {
        width: '20%',
        // backgroundColor: 'yellow',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    boardArea: {
        height: '90%',
        display: 'flex',
        alignItems: 'center',

    },
    headerTextContainer: {
        width: '30%',
        // backgroundColor: 'purple',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'

    },
    headerOptionsContainer: {
        width: '50%',
        // backgroundColor: 'pink',
        display: 'flex',
        flexDirection: 'row',



    },
    headerText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600'
    },

    boardItemContainer: {
        minWidth: '100%',
        minHeight: 45,
        backgroundColor: 'rgb(246, 248, 250)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,

    },

    boardItemColoredSquare: {
        width: '20%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        right: 4

    },
    BoardItemAddSymbol: {
        width: '12%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        right: 4
    },
    boardItemBlueBox: {
        height: '100%',
        width: '50%',
        backgroundColor: '#006fb1',

    },
    boardItem: {
        fontSize: 14,
        color: 'black',
        fontWeight: '500',
        left: 2
    },
    addMoreContainer: {
        minHeight: '20%',
        minWidth: '100%',

        position: 'absolute',
        bottom: 10,
        left: '83%'
    },
    boardAreaHeader: {
        backgroundColor: 'white',
        height: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    boardAreaHeaderText: {
        color: 'black',
        fontWeight: '500',
        width: '82%'
    },
    newCardInfoContainer: {
        width: '80%',
        height: '25%',
        position: 'absolute',
        backgroundColor: 'rgb(246, 248, 250)',
        borderRadius: 10,
        left: '10%',
        top: '37.5%',
        display: 'block',
        borderWidth: 1,
        borderColor: 'grey'

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
    cardInfoInput: {
        height: '40%',
        // backgroundColor: 'pink'
    },
    cardInfoInputButtons: {
        height: '35%',
        // backgroundColor: 'yellow',
        display: 'flex',
        flexDirection: 'row'
    },
    cardInfoTitleText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black',
        left: 10
    },
    inputBox: {
        borderWidth: 1,
        borderColor: 'black',
        width: '90%',
        left: 10
    },
    cancelButtonConatiner: {
        width: '40%',
        backgroundColor: 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    createButtonContainer: {
        width: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#006fb1',
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '600',
        color: 'white'
    },
    horizontalLines: {
        height: 20,
        width: 20,

    },
    innerHeaderOptionsContainer: {
        width: '40%',
        // backgroundColor:'red',

    },
    searchIconContainer: {
        width: '30%',
        // backgroundColor:'yellow',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    notificationIconContainer: {
        width: '30%',
        // backgroundColor:'pink',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addBoardButtonIcon: {
        height: 53,
        width: 53,
    },
    iconsContainer: {
        borderRadius: 80,
        padding: 22,
        backgroundColor: '#006fb1',

    },
    iconText: {
        fontSize: 15,
        fontWeight: '600',
        color: 'white',
    },
    outterIconsContainer: {
        marginBottom: 13,
        borderRadius: 10,
        backgroundColor: '#006fb1',
        position: 'absolute',
        bottom: 60,
        left: '75%'

    },
    outterIconsCardContainer: {
        marginBottom: 83,
        borderRadius: 10,
        backgroundColor: '#006fb1',
        position: 'absolute',
        bottom: 60,
        left: '75%'
    },
    hideIcons: {
        display: 'none'
    }


})