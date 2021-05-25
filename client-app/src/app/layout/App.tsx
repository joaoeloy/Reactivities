import React, {Fragment, useEffect, useState} from 'react';
import { Container,  } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuidv4 } from 'uuid';
import agent from '../api/agents';
import LoadingComponent from './LoadingComponent';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: Activity[] = []
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity)
      })
      setActivities(activities);
      setLoading(false);
    })
  }, []);

  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelecdActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelecdActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEdit(activity: Activity){
    setSubmitting(true)
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false)
      })
    } else {
      activity.id = uuidv4()
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSubmitting(false)
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmitting(false)
    })
    
  }

  if (loading) return <LoadingComponent content='Loading App' />

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop:'5em'}}>
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelecdActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEdit}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
