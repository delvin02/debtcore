import { defineStore } from 'pinia'
import axios from "axios"

export const connectionStore = (key: string) => {
    return defineStore(key, {
        state: () => ({
            is_authenticated: false,
            authenticate_url: '',
            url: '',
            link: '',
            is_loading: false
        }),
        actions: {
            async init(url: string) {
                this.url = url;
                this.is_loading = true;

                try {
                    const response = await axios.get(url, {
                        withCredentials: true,
                        headers: {
                            'Cache-Control': 'no-cache',
                            Pragma: 'no-cache',
                            Expires: '0',
                        },
                    });
                    this.is_authenticated = response.data.Result.is_authenticated
                    this.authenticate_url = response.data.Result.authenticate_url
                } catch (error) {
                    console.log('this was an error initializing the connection', error)
                } finally {
                    this.is_loading = false;
                }
            },
            async disconnect() {
                this.is_loading = true;
                try {
                    const response = await axios.put(this.url, {
                        withCredentials: true,
                        headers: {
                            'Cache-Control': 'no-cache',
                            Pragma: 'no-cache',
                            Expires: '0',
                        },
                    });
                    this.is_authenticated = false;
                } catch (error) {
                    console.log('There was an error disconnecting the connection', error);
                } finally {
                    this.is_loading = false;
                }
            }
        },
    })();
};