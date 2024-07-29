import { useState, useEffect } from 'react';
import { axiosGet } from '../global/axiosCall';

const useFetchData = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosGet(url)
                if (!response.status) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.data;
                setData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, error, loading };
};

export default useFetchData;
