import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

export default observer( function ActivityForm() {

    const {activityStore} = useStore();
	const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore;    
    
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    };

    const [activity, setActivity] = useState(initialState); 


    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target
        setActivity({...activity, [name]:value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input onChange={handleInputChange} placeholder='Title' name='title' value={activity.title}/>
                <Form.TextArea onChange={handleInputChange} placeholder='Description' name='description' value={activity.description}/>
                <Form.Input onChange={handleInputChange} placeholder='Category' name='category'value={activity.category}/>
                <Form.Input type='date' onChange={handleInputChange} placeholder='Date' name='date'value={activity.date}/>
                <Form.Input onChange={handleInputChange} placeholder='City' name='city'value={activity.city}/>
                <Form.Input onChange={handleInputChange} placeholder='Venue' name='venue'value={activity.venue}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' onClick={closeForm} />
            </Form>
        </Segment>

    )
}
)