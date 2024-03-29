import { Box, Alert, Button } from '@mui/material';
import rootStore from '../stores/RootStore';

const TagsError = () => {
    const { tagsStore: { 
        getTagsData,
        error } 
    } = rootStore;

    return (
        <Box component={'section'} marginTop={6}>
            <Alert severity='error'>{error}</Alert>
            <Button 
                onClick={getTagsData}
                variant="outlined" 
                color="error" 
                sx={{marginTop: "13px"}}
            >
                Try again
            </Button>
        </Box>
    )
}

export default TagsError