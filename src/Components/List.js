import '../App.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const List = ({ data }) => {

    const { user } = useParams();

    // in the printout there are a lot of else-if condition depending on 
    // whether the user is on 'admin' or 'quest' page

    // e.g. Link on top of the page is a toggle between 'kirjaudu adminiksi'
    // and 'kirjaudu ulos' depending on whether user is on admin or quest page. 

    return (
        <>
        <Link to={`/${user === 'quest' ? 'admin' : 'quest'}`}>
            {user === 'quest' ? 'Kirjaudu adminiksi' : 'Kirjaudu ulos'}
        </Link> 
        <h1>{user === 'quest' ? 'Avoimet kyselyt' : 'Katso vastaukset'}</h1>
        {data.map((i) => (
            <Card className='Cont' key={i.questionnaryId}>  
                <CardActionArea className='Inquiry'>
                    <Link to={`/${user === 'quest' ? 'form' : 'answers'}/${i.questionnaryId}`}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {i.header}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {i.description}
                            </Typography>
                        </CardContent>
                    </Link>
                </CardActionArea>
            </Card>
        ))}
        </>
    );
}

export default List;