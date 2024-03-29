import React, {useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import rootStore from '../stores/RootStore';
import { Box, TextField } from '@mui/material';
import TagsSkeleton from './TagsSkeleton';
import './tags.css';
import TagsTable from './TagsTable';
import TagsError from './TagsError';

const TagsMain: React.FC = observer(() => {
    const { tagsStore: { 
        getTagsData,
        loading, 
        error } 
    } = rootStore;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    useEffect(() => {
        getTagsData();
    }, [])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const isNumeric = /^[0-9\b]+$/;
        let newValue = e.target.value;

        if(newValue === '')
        {
            setPage(0);
            setRowsPerPage(0)
        }

        if (isNumeric.test(newValue))
           if(parseInt(newValue) >= 0)
           {
                setPage(0);
                setRowsPerPage(parseInt(newValue))
           }
        
    }

    if(loading)
        return <TagsSkeleton />;
    
    if(error) 
        return <TagsError />;

    return (
        <Box component={'section'} marginTop={6}>
            <TextField 
                id='table-size'
                label={'Rows per page'}
                value={rowsPerPage}
                margin='normal'
                onChange={handleChangeRowsPerPage}
            />
            <TagsTable 
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
            />
        </Box>
    );
});

export default TagsMain;