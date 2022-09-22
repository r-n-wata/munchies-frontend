import { React, useState, useEffect} from "react";
import Navigate from "../Navigation/Navigation";
import '../../css/FullCalender.css'
import Calender from "./Calender";
import AddRecipeToCalender from "./AddRecipeToCalender";
import Recipes from "../ShowRecipes/Recipes";
import { MuiPickersUtilProvider } from '@material-ui/pickers'
import jwtDecode from "jwt-decode";
import axios from "../../api/axios";
import MessageBox from "../Messege";


export default function FullCalender(){

    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState(' ')
    const [recipeID, setRecipeID] = useState('')
    const [showChooseRecipes, setShowChooseRecipes] = useState(true)
    const [selectRecipe, setSelectRecipe] = useState(false)
    const [userID, setUserID] = useState('')
    const [data, setData] = useState([])
    const [selectedRecipeName, setSelectedRecipeName] = useState('')
    const [selectedRecipeImg, setSelectedRecipeImg] = useState('')
    const [retrievedEvents, setRetrievedEvents] = useState('')
    const [messageBoxTitle, setMessageBoxTitle] = useState('')
    const [messageBoxMessage, setMessageBoxMessage] = useState('')
    const [alert , setAlert ] = useState(false)
    const [showSaveBtn, setShowSaveBtn] = useState(false)
    const [showCalendarBtn, setShowCalendarBtn] = useState(true)

    const broccoli =  require('../../imgs/vegetables/broccoli.png');
    const handleBackBtn = () => {
        setSelectedDate()
        setRecipeID('')
        setShowChooseRecipes(prevState => !prevState)
        setSelectRecipe(false)

    }

    
  
  
    // posts event
    const handleSubmit = (e) => {
        setAlert(true);
        setTimeout(() => {
                       setAlert(false);
                   }, 3000);
        const date = selectedDate.toString().split(' ').slice(0, 4).join(' ')
        const token = localStorage.getItem('token')
       
        
        e.preventDefault();
        axios.post('http://localhost:2121/api/event/addevent', JSON.stringify({
            recipeID: recipeID,
            recipeName: '',
            date: date,
            time: selectedTime,
            name: selectedRecipeName,
            image: selectedRecipeImg

        }),{
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}` 
            }
        })

    .then(response => {
          const user= response.data.token
          setMessageBoxTitle('Success')
          setMessageBoxTitle('Successfully added the event!')
          setShowCalendarBtn(true)
          setShowSaveBtn(false)
          window.location.reload();
       
    })
    .catch(err => {
        console.log(err)
        setMessageBoxMessage('Failed')
        setMessageBoxTitle('Failed to add the event, please check all information is correctly filled!')
    })


}


    // retrives plan
    

    console.log(selectedRecipeName)
   
    return(
        <section className="home section-container">
        <div className="header calender-header">
            <h1 className="header-title">Calendar</h1>
            {/* <img src={carrot} alt='' className="header-img"/> */}
            <img src={ broccoli } alt='' className="calendar-img"/>
        </div>
        <div className={!selectedDate ? "content grey" : 'content'}>


            <div className={!selectedDate ? 'calenderContainer toFront calender' : 'toBack calenderContainer'}>
              <Calender 
                setSelectedDate = { setSelectedDate }
               
               
                />
            </div>

          
          

            <div className={selectedDate ? "add-recipe-container toFront " : 'toBack add-recipe-container background'}>

                   <AddRecipeToCalender 
                    date = { selectedDate }
                    selectedDate ={ selectedDate }
                    recipeID = {recipeID}
                    setRecipeID = { setRecipeID }
                    showChooseRecipes = { showChooseRecipes }
                    selectRecipe = { selectRecipe }
                    seleectedDate = { setSelectedDate }
                    setSelectRecipe = { setSelectRecipe }
                    setSelectedTime = { setSelectedTime }
                    retrievedEvents= { retrievedEvents }
                    setRetrievedEvents = { setRetrievedEvents }
                    setSelectedRecipeName = { setSelectedRecipeName }
                    setShowSaveBtn = { setShowSaveBtn }
                    setShowCalendarBtn= { setShowCalendarBtn }
                    selectedRecipeName = { selectedRecipeName }
                    selectedRecipeImg = { selectedRecipeImg }
                    setSelectedRecipeImg ={ setSelectedRecipeImg }
                    
                    
                    />
                    {
                        showSaveBtn &&  <button type='submit' className={selectedDate ? "recipes-btns toFront " : ' recipes-btns  toBack'} id='save-event'  onClick={ handleSubmit }>Save Event</button>
                    }
                   

                    {
                        selectedDate && showCalendarBtn && <button type="button" className="recipes-btns " id="back-to-calender-btn" onClick={ handleBackBtn }>calender</button>
                    }

                    { alert &&

                        <MessageBox
                            message={ messageBoxMessage }
                            status = { messageBoxTitle }
                            />
                    }
                                        
                    

            </div>

            
             
            <Navigate />


        </div>
      
    </section>
    )
}