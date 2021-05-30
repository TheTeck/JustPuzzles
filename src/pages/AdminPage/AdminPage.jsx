import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import * as puzzleService from '../../utils/puzzleService'
import './AdminPage.css'

export default function AdminPage ({ admin, handleLogout }) {
    
    const [selectedFile, setSelectedFile] = useState('')
    const [state, setState] = useState({
        width: '',
        height: '',
        month: '1',
        day: '1',
        year: '2021'
    })      
    
    const history = useHistory()

    const monthOptions = [
        { text: 'January', value: '1' },
        { text: 'February', value: '2' },
        { text: 'March', value: '3' },
        { text: 'April', value: '4' },
        { text: 'May', value: '5' },
        { text: 'June', value: '6' },
        { text: 'July', value: '7' },
        { text: 'August', value: '8' },
        { text: 'September', value: '9' },
        { text: 'October', value: '10' },
        { text: 'November', value: '11' },
        { text: 'December', value: '12' },
    ]

    const dayOptions = [
        { text: '1', value: '1' },
        { text: '2', value: '2' },
        { text: '3', value: '3' },
        { text: '4', value: '4' },
        { text: '5', value: '5' },
        { text: '6', value: '6' },
        { text: '7', value: '7' },
        { text: '8', value: '8' },
        { text: '9', value: '9' },
        { text: '10', value: '10' },
        { text: '11', value: '11' },
        { text: '12', value: '12' },
        { text: '13', value: '13' },
        { text: '14', value: '14' },
        { text: '15', value: '15' },
        { text: '16', value: '16' },
        { text: '17', value: '17' },
        { text: '18', value: '18' },
        { text: '19', value: '19' },
        { text: '20', value: '20' },
        { text: '21', value: '21' },
        { text: '22', value: '22' },
        { text: '23', value: '23' },
        { text: '24', value: '24' },
        { text: '25', value: '25' },
        { text: '26', value: '26' },
        { text: '27', value: '27' },
        { text: '28', value: '28' },
        { text: '29', value: '29' },
        { text: '30', value: '30' },
        { text: '31', value: '31' },
    ]

    const yearOptions = [
        { text: '2021', value: '2021' },
        { text: '2022', value: '2022' },
        { text: '2023', value: '2023' },
        { text: '2024', value: '2024' },
        { text: '2025', value: '2025' },
        { text: '2026', value: '2026' },
        { text: '2027', value: '2027' },
        { text: '2028', value: '2028' },
        { text: '2029', value: '2029' },
        { text: '2030', value: '2030' },
    ]


    function handleLogoutClick () {
        handleLogout()
        history.push('/')
    }

    function handleFileInput(e){
        setSelectedFile(e.target.files[0])
    }

    function handleChange(e){
        setState({
          ...state,
          [e.target.name]: e.target.value
        })
    }

    function handleMonthChange(e, {value}) {
        setState({
            ...state,
            month: value
        })
    }

    function handleDayChange(e, {value}) {
        setState({
            ...state,
            day: value
        })
    }

    function handleYearChange(e, {value}) {
        setState({
            ...state,
            year: value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
    
        const formData = new FormData()

        formData.append('photo', selectedFile)
        formData.append('width', state.width)
        formData.append('height', state.height)
        formData.append('month', state.month)
        formData.append('day', state.day)
        formData.append('year', state.year)
        
        handleAddPuzzle(formData)
    }

    async function handleAddPuzzle(puzzle){
        try {
            const data = await puzzleService.create(puzzle)
            console.log(data)    
        } catch(err){
            console.log(err)
        }
    }

    return (
        <div id="admin-container">
            <div onClick={handleLogoutClick} id="logout-btn">Log Out</div>
            <Grid id="form-container" textAlign='left' verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Segment>
                    
                        <Form  autoComplete="off" onSubmit={handleSubmit}>
                            <Form.Field>
                                <label>Puzzle Image</label>
                                <Form.Input
                                    className="form-control"
                                    type="file"
                                    name="photo"
                                    placeholder="Upload Image"
                                    onChange={handleFileInput}
                                />
                            </Form.Field>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <label>Image Width (px)</label>
                                    <Form.Input
                                        className="form-control"
                                        name="width"
                                        value={state.caption}
                                        placeholder="Width"
                                        onChange={handleChange}
                                        required
                                    /> 
                                </Form.Field> 
                                <Form.Field>
                                    <label>Image Height (px)</label>
                                    <Form.Input
                                        className="form-control"
                                        name="height"
                                        value={state.caption}
                                        placeholder="Height"
                                        onChange={handleChange}
                                        required
                                    />  
                                </Form.Field>
                            </Form.Group>
                                <Form.Select  
                                    label="Month"          
                                    name="month"
                                    defaultValue="1"
                                    options={monthOptions}
                                    onChange={handleMonthChange}
                                    required
                                />
                                <Form.Select    
                                    label="Day"          
                                    name="day"
                                    defaultValue="1"
                                    options={dayOptions}
                                    onChange={handleDayChange}
                                    required
                                />
                                <Form.Select  
                                    label="Year"          
                                    name="year"
                                    defaultValue="2021"
                                    options={yearOptions}
                                    onChange={handleYearChange}
                                    required
                                />
                            <div style={{ textAlign: "center" }}>
                                <Button
                                    type="submit"
                                    className="btn"
                                    color="red"
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        </div>
    )
}