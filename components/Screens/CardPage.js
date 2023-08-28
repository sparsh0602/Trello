import { View, Text, StyleSheet, FlatList, Button, TextInput, TouchableOpacity, Alert, Image, Platform } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
const CardPage = ({ route, navigation }) => {

    const [subDescription, setsubDescription] = useState('');
    const [description, setdescription] = useState("");
    const [sDate, setsDate] = useState("");
    const [dDate, setdDate] = useState("");
    const [activityComment, setactivityComment] = useState("");
    const [showStartDateText, setshowStartDateText] = useState(true)
    const [setOpacity, setsetOpacity] = useState(1)

    const [sdate, setsdate] = useState(new Date())
    const [ddate, setddate] = useState(new Date())
    const [mode, setmode] = useState('date')
    const [show, setshow] = useState(false)
    const [text, settext] = useState('Empty')
    const [dateType, setdateType] = useState("")

    useEffect(() => {

        for (let i = 0; i < route.params.listNames.length; i++) {
            if (route.params.listNames[i].BoardName === route.params.boardTitle) {

                for (let j = 0; j < route.params.listNames[i].BoardCards.length; j++) {
                    if (route.params.listNames[i].BoardCards[j].name == route.params.list) {
                        for (let k = 0; k < route.params.listNames[i].BoardCards[j].cards.length; k++) {
                            if (route.params.listNames[i].BoardCards[j].cards[k].cardName === route.params.cardTitle) {
                                setsDate(route.params.listNames[i].BoardCards[j].cards[k].SDate)
                                setdDate(route.params.listNames[i].BoardCards[j].cards[k].DDate)
                                setsubDescription(route.params.listNames[i].BoardCards[j].cards[k].SubDescription)
                                setdescription(route.params.listNames[i].BoardCards[j].cards[k].Description)

                                
                            }
                        }
                    }

                }
            }
        }
    },[])


    const onChange = (event, selectedDate) => {

        const currDate = selectedDate || Date;
        setshow(Platform.OS === 'ios');
        // setsDate(currDate);
        setshow(true)
        let tempDate = new Date(currDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        

        if (dateType == "sdate")
        
            setsDate(fDate);
        
        else
        
            setdDate(fDate);
        

    }

    function showMode(dateType) {
        setmode('date');
        setshow(true);
        setsetOpacity(0.5);
        setdateType(dateType)
        // console.log(dateType);
      
    }

    function SetDates() {
        setshow(false);
        setsetOpacity(1);

        let tempDate = new Date();
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();

        if (sDate == "" && dDate == "") {
            if (dateType == "sdate")
                setsDate(fDate);
            else
                setdDate(fDate);
        }

        for (let i = 0; i < route.params.listNames.length; i++) {
            if (route.params.listNames[i].BoardName === route.params.boardTitle) {

                for (let j = 0; j < route.params.listNames[i].BoardCards.length; j++) {
                    if (route.params.listNames[i].BoardCards[j].name == route.params.list) {
                        for (let k = 0; k < route.params.listNames[i].BoardCards[j].cards.length; k++) {
                            if (route.params.listNames[i].BoardCards[j].cards[k].cardName === route.params.cardTitle) {
                                if (dateType == "sdate")
                                    route.params.listNames[i].BoardCards[j].cards[k].SDate = sDate;                               
                                else
                                    route.params.listNames[i].BoardCards[j].cards[k].DDate = dDate;
                            }
                        }
                    }

                }
            }
        }
     
    }

    const [value, setvalue] = useState("")

    function setDetailes()
    {

        for (let i = 0; i < route.params.listNames.length; i++) {
            if (route.params.listNames[i].BoardName === route.params.boardTitle) {

                for (let j = 0; j < route.params.listNames[i].BoardCards.length; j++) {
                    if (route.params.listNames[i].BoardCards[j].name == route.params.list) {
                        for (let k = 0; k < route.params.listNames[i].BoardCards[j].cards.length; k++) {
                            if (route.params.listNames[i].BoardCards[j].cards[k].cardName === route.params.cardTitle) {
                                if (dateType == "sdate")
                                    route.params.listNames[i].BoardCards[j].cards[k].SubDescription = subDescription;                               
                                else
                                    route.params.listNames[i].BoardCards[j].cards[k].Description = description;
                            }
                        }
                    }

                }
            }
        }
        
        
        navigation.navigate('BoardPage', { boardTitle: route.params.boardTitle, listNames: route.params.listNames, setlistNames: route.params.setlistNames }) ;
    }
    return (
        <View style={Styles.bodyContainer}>
            <View style={setOpacity == 1 ? { opacity: 1 } : { opacity: 0.5 }}>
                <View>
                    <View style={Styles.extraSpaceAtTop}>

                    </View>
                    <View style={Styles.header}>
                        <TouchableOpacity style={Styles.headerOtherOptionsContainer} onPress={() => { setDetailes()}}>
                            <Image source={require('Trello/components/Images/CardPageBackArrow.png')} style={Styles.backArrow} />
                        </TouchableOpacity>
                        <View style={Styles.headerTextContainer}>


                        </View>
                        <View style={Styles.headerOptionsContainer}>
                            <View style={Styles.innerHeaderOptionsContainer}>

                            </View>

                            <View style={Styles.searchIconContainer}>

                            </View>
                            <View style={Styles.notificationIconContainer}>
                                <Image source={require('Trello/components/Images/ThreeDotsCardPage.png')} style={Styles.horizontalLines} />
                            </View>

                        </View>
                    </View>
                </View>

                <View style={Styles.cardTitleContainer}>
                    <Text style={Styles.cardTitle}>{route.params.cardTitle}</Text>
                </View>

                <View style={Styles.subDescriptionContainer}>
                    <TextInput
                        placeholder="Add Sub Description"
                        style={Styles.subDescription}
                        maxLength={50}
                        multiline={true}
                        numberOfLines={2}
                        onChangeText={text => setsubDescription(text.toString())}
                        value={subDescription}
                        
                    />
                </View>

                <View style={Styles.descriptionContainer}>
                    <TextInput
                        placeholder="Add Description"
                        style={Styles.description}
                        maxLength={150}
                        multiline={true}
                        numberOfLines={3}
                        onChangeText={text =>  setdescription(text) }
                        value={description}
                    />
                </View>

                <View style={Styles.infoContainer}>
                    <View style={Styles.infoIconContainer}>
                        <Image source={require('Trello/components/Images/Labelicon.png')} style={Styles.LabelIcon} />
                    </View>
                    <View style={Styles.infoTitleContainer}>
                        <Text style={Styles.infoTitle}>Label</Text>
                    </View>
                </View>
                <View style={Styles.infoContainer}>
                    <View style={Styles.infoIconContainer}>
                        <Image source={require('Trello/components/Images/member.png')} style={Styles.LabelIcon} />
                    </View>
                    <View style={Styles.infoTitleContainer}>
                        <Text style={Styles.infoTitle}>Members</Text>
                    </View>
                </View>
                <View style={Styles.infoContainer}>
                    <View style={Styles.infoIconContainer}>
                        <Image source={require('Trello/components/Images/Clock.png')} style={Styles.LabelIcon} />
                    </View>
                    <View style={Styles.infoTitleContainer}>
                        <TouchableOpacity style={Styles.infoTitle} onPress={() => { showMode("sdate") }}><Text>Start Date..</Text></TouchableOpacity>
                        <Text>{sDate}</Text>
                    </View>
                </View>
                <View style={Styles.infoContainer}>
                    <View style={Styles.infoIconContainer}></View>
                    <View style={Styles.infoTitleContainer}>
                        <TouchableOpacity style={Styles.infoTitle} onPress={() => { showMode("ddate") }}><Text>Due Date..</Text></TouchableOpacity>
                        <Text>{dDate}</Text>
                    </View>
                </View>
                <View style={Styles.infoContainer2}>
                    <View style={Styles.infoIconContainer}>
                        <Image source={require('Trello/components/Images/checkList.png')} style={Styles.LabelIcon} />
                    </View>
                    <View style={Styles.infoTitleContainer}>
                        <Text style={Styles.infoTitle}>Checklist..</Text>
                    </View>
                </View>
                <View style={Styles.infoContainer2}>
                    <View style={Styles.infoIconContainer}>
                        <Image source={require('Trello/components/Images/Attachment.png')} style={Styles.LabelIcon} />
                    </View>
                    <View style={Styles.infoTitleContainer}>
                        <Text style={Styles.infoTitle}>Attachment..</Text>
                    </View>
                </View>

                <View style={Styles.activityTitleConatiner}>
                    <View style={Styles.activityTitleSubContainer}>
                        <Text style={Styles.activityTitle}>ACTIVITY</Text>
                    </View>
                    <View style={Styles.activityTitleMoreOptionContainer}>
                        <Image source={require('Trello/components/Images/threeDotCardPage.png')} style={Styles.backArrow} />
                    </View>
                </View>

                <View style={Styles.infoContainer2}>
                    <View style={Styles.infoIconContainer}></View>
                    <View style={Styles.infoTitleContainer}>
                        <TextInput
                            editable
                            multiline
                            numberOfLines={4}
                            style={{ padding: 5 }}
                            maxLength={80}
                            onChangeText={text => setvalue(text)}
                            value={value}
                            placeholder='Add comment'

                        />
                    </View>
                </View>
            </View>
            {show && (<DateTimePicker
                testID='dateTimePicker'
                value={dateType == "sdate" ? sdate : ddate}
                mode={mode}
                is24Hour={true}
                display='spinner'
                onChange={onChange}
                style={Styles.selectDateStyle}
            />)}

            <TouchableOpacity style={setOpacity == 0.5 ? Styles.setDate : Styles.setDateInvisible} onPress={() => { SetDates() }}><Text style={Styles.setDateText}>{dateType == "sdate" ? "Set as Start Date" : "Set as Due Date"}</Text></TouchableOpacity>

        </View>
    )
}
const Styles = StyleSheet.create({
    extraSpaceAtTop: {
        display: 'flex',
        backgroundColor: '#FFFAFA',
        minHeight: '3%',
    },
    header: {
        display: 'flex',
        backgroundColor: '#FFFAFA',
        minHeight: '7%',
        minwidth: '100%',
        flexDirection: 'row'
    },
    headerOtherOptionsContainer: {
        width: '20%',
        // backgroundColor: 'yellow',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        left: 20
    },
    backArrow: {
        height: 15,
        width: 30,
    },
    LabelIcon: {
        height: 20,
        width: 20,
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
    filterIcon: {
        height: 15,
        width: 15,
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
        height: 30,
        width: 30,

    },
    bodyContainer: {
        backgroundColor: 'hsl(210,8%,85%)',
        height: '100%'
    },
    notificationIconContainer: {
        width: '30%',
        // backgroundColor:'pink',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardTitleContainer: {
        width: '100%',
        height: '10%',
        backgroundColor: '#FFFAFA',
        display: 'flex',
        justifyContent: 'center'
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '500',
        left: 20
    },
    subDescriptionContainer: {
        minHeight: '5%',
        width: '100%',
        backgroundColor: '#FFFAFA',
        display: 'flex',

    },
    subDescription: {
        left: 20,
        width: '90%'

    },
    descriptionContainer: {
        width: '100%',
        minHeight: '10%',
        backgroundColor: '#FFFAFA',
        top: 2,
        paddingBottom: 10,
        marginBottom: 2
    },
    description: {
        left: 20,
        width: '85%',
        top: 5,

    },
    infoContainer: {
        width: '100%',
        height: '6%',
        marginTop: 2,
        backgroundColor: '#FFFAFA',
        display: 'flex',
        flexDirection: 'row',

    },
    infoContainer2: {
        width: '100%',
        minHeight: '6%',
        marginTop: 5,
        backgroundColor: '#FFFAFA',
        display: 'flex',
        flexDirection: 'row',
    },
    infoIconContainer: {
        width: '15%',
        // backgroundColor:'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoTitleContainer: {
        // backgroundColor:'yellow',
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    },
    activityTitleConatiner: {
        width: '100%',
        height: '9%',
        // backgroundColor:'red',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'

    },
    activityTitleSubContainer: {
        width: '50%',
        // backgroundColor:'yellow'
    },
    activityTitleMoreOptionContainer: {
        width: '50%',
        // backgroundColor:'pink',
        display: 'flex',
        alignItems: 'flex-end',
        right: 15
    },
    activityTitle: {
        left: 20
    },
    moreActivityIcon: {
        right: 15
    },
    selectDateStyle: {
        position: 'absolute',
        height: '50%',
        width: '90%',
        top: '25%',
        left: '5%',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
    },
    setDate: {
        position: 'absolute',
        height: '8%',
        width: '50%',
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'hsl(210,8%,85%)',
        left: "25%",
        top: '70%',
        borderRadius: 10,
        borderWidth: 1
    },
    setDateText: {
        fontSize: 15,
        fontWeight: '500'
    },
    setDateInvisible: {
        display: 'none'
    },
    infoTitle: {
        width: '40%'
    }


})

export default CardPage