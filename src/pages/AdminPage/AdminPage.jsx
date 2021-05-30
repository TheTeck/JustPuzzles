import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import './AdminPage.css'

export default function AdminPage ({ admin, handleLogout }) {
    
    const [selectedFile, setSelectedFile] = useState('')
    const [state, setState] = useState({
        caption: ''
    })      
    
    const history = useHistory()

    function handleLogoutClick () {
        handleLogout()
        history.push('/')
    }

    

    async function handleAddPost(post){
        console.log('hanlde add Post')
        try {
            
            const data = await postService.create(post)
    
        } catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <div onClick={handleLogoutClick}>Log Out</div>
            <Grid textAlign='center' style={{ height: '25vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Segment>
                    
                        <Form  autoComplete="off" onSubmit={handleSubmit}>
                        
                        <Form.Input
                            className="form-control"
                            type="file"
                            name="photo"
                            placeholder="upload image"
                            onChange={handleFileInput}
                        />   
                        <Form.Input
                            className="form-control"
                            name="caption"
                            value={state.caption}
                            placeholder="What's new"
                            onChange={handleChange}
                            required
                        />   
                        <Button
                            type="submit"
                            className="btn"
                        >
                            Submit
                        </Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    )
}