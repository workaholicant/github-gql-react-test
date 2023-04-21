import { useEffect, useState } from "react";
import { httpLink } from "../utils/apolloClient"
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

const useApolloClient = () => {
    const [client] = useState<ApolloClient<NormalizedCacheObject>>(new ApolloClient({ cache: new InMemoryCache() }));

    useEffect(() => {
        client.setLink(httpLink);
    }, [client]);

    return client;
}

export default useApolloClient;