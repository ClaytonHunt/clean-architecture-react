import React, { useContext, createContext } from 'react';

const DependencyContext = createContext();

export default function DependencyProvider({ children, deps }) {
    if (!deps) {
        throw new Error('deps is a required attribute.');
    }

    const injections = [];
    
    const addSingleton = (contract, instance) => injections.push({ contract: contract, factory: () => instance });

    const addTransient = (contract, factory) => injections.push({ contract: contract, factory: factory });

    const inject = (contract) => {
        var found = injections.find(x => x.contract === contract);

        if (!found) {
            throw new Error(`Can't find dependency with contract ${Symbol.keyFor(contract)}`);
        }

        return found.factory();
    };

    deps(addSingleton, addTransient, inject);

    return <DependencyContext.Provider value={injections}>{children}</DependencyContext.Provider>
}

export function useInject(contracts) {
    const context = useContext(DependencyContext);

    if (context === undefined) {
        throw new Error('useInject must be used within a DependencyProvider')
    }

    let result = [];

    console.log(context);

    for (let i = 0; i < contracts.length; i++) {
        var found = context.find(x => x.contract === contracts[i]);

        if (!found) {
            throw new Error(`Can't find dependency with contract ${Symbol.keyFor(contracts[i])}`);
        }

        result.push(found.factory());
    }

    return result;
}