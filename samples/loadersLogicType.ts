// Generated by kea-typegen on Wed, 23 Jun 2021 09:13:13 GMT. DO NOT EDIT THIS FILE MANUALLY.

import { Logic } from 'kea'

import { Dashboard } from './types'

export interface loadersLogicType extends Logic {
    actionCreators: {
        addDashboard: (
            name: string,
        ) => {
            type: 'add dashboard (loadersLogic)'
            payload: {
                name: string
            }
        }
        addDashboardSuccess: (
            dashboard: Dashboard,
        ) => {
            type: 'add dashboard success (loadersLogic)'
            payload: {
                dashboard: Dashboard
            }
        }
        addDashboardFailure: (
            error: string,
        ) => {
            type: 'add dashboard failure (loadersLogic)'
            payload: {
                error: string
            }
        }
        addDashboardNoType: ({
            name,
        }: {
            name: string
        }) => {
            type: 'add dashboard no type (loadersLogic)'
            payload: {
                name: string
            }
        }
        addDashboardNoTypeSuccess: (
            dashboard: Dashboard,
        ) => {
            type: 'add dashboard no type success (loadersLogic)'
            payload: {
                dashboard: Dashboard
            }
        }
        addDashboardNoTypeFailure: (
            error: string,
        ) => {
            type: 'add dashboard no type failure (loadersLogic)'
            payload: {
                error: string
            }
        }
        loadIt: () => {
            type: 'load it (loadersLogic)'
            payload: any
        }
        loadItSuccess: (misc: {
            id: number
            name: void
            pinned: boolean
        }) => {
            type: 'load it success (loadersLogic)'
            payload: {
                misc: { id: number; name: void; pinned: boolean }
            }
        }
        loadItFailure: (
            error: string,
        ) => {
            type: 'load it failure (loadersLogic)'
            payload: {
                error: string
            }
        }
    }
    actionKeys: {
        'add dashboard (loadersLogic)': 'addDashboard'
        'add dashboard success (loadersLogic)': 'addDashboardSuccess'
        'add dashboard failure (loadersLogic)': 'addDashboardFailure'
        'add dashboard no type (loadersLogic)': 'addDashboardNoType'
        'add dashboard no type success (loadersLogic)': 'addDashboardNoTypeSuccess'
        'add dashboard no type failure (loadersLogic)': 'addDashboardNoTypeFailure'
        'load it (loadersLogic)': 'loadIt'
        'load it success (loadersLogic)': 'loadItSuccess'
        'load it failure (loadersLogic)': 'loadItFailure'
    }
    actionTypes: {
        addDashboard: 'add dashboard (loadersLogic)'
        addDashboardSuccess: 'add dashboard success (loadersLogic)'
        addDashboardFailure: 'add dashboard failure (loadersLogic)'
        addDashboardNoType: 'add dashboard no type (loadersLogic)'
        addDashboardNoTypeSuccess: 'add dashboard no type success (loadersLogic)'
        addDashboardNoTypeFailure: 'add dashboard no type failure (loadersLogic)'
        loadIt: 'load it (loadersLogic)'
        loadItSuccess: 'load it success (loadersLogic)'
        loadItFailure: 'load it failure (loadersLogic)'
    }
    actions: {
        addDashboard: (name: string) => void
        addDashboardSuccess: (dashboard: Dashboard) => void
        addDashboardFailure: (error: string) => void
        addDashboardNoType: ({ name }: { name: string }) => void
        addDashboardNoTypeSuccess: (dashboard: Dashboard) => void
        addDashboardNoTypeFailure: (error: string) => void
        loadIt: () => void
        loadItSuccess: (misc: { id: number; name: void; pinned: boolean }) => void
        loadItFailure: (error: string) => void
    }
    constants: {}
    defaults: {
        dashboard: Dashboard | null
        dashboardLoading: boolean
        shouldNotBeNeverButAny: any[]
        shouldNotBeNeverButAnyLoading: boolean
        misc: Record<string, any>
        miscLoading: boolean
    }
    events: {}
    key: undefined
    listeners: {}
    path: ['loadersLogic']
    pathString: 'loadersLogic'
    props: Record<string, unknown>
    reducer: (
        state: any,
        action: () => any,
        fullState: any,
    ) => {
        dashboard: Dashboard | null
        dashboardLoading: boolean
        shouldNotBeNeverButAny: any[]
        shouldNotBeNeverButAnyLoading: boolean
        misc: Record<string, any>
        miscLoading: boolean
    }
    reducerOptions: {}
    reducers: {
        dashboard: (state: Dashboard | null, action: any, fullState: any) => Dashboard | null
        dashboardLoading: (state: boolean, action: any, fullState: any) => boolean
        shouldNotBeNeverButAny: (state: any[], action: any, fullState: any) => any[]
        shouldNotBeNeverButAnyLoading: (state: boolean, action: any, fullState: any) => boolean
        misc: (state: Record<string, any>, action: any, fullState: any) => Record<string, any>
        miscLoading: (state: boolean, action: any, fullState: any) => boolean
    }
    selector: (
        state: any,
    ) => {
        dashboard: Dashboard | null
        dashboardLoading: boolean
        shouldNotBeNeverButAny: any[]
        shouldNotBeNeverButAnyLoading: boolean
        misc: Record<string, any>
        miscLoading: boolean
    }
    selectors: {
        dashboard: (state: any, props?: any) => Dashboard | null
        dashboardLoading: (state: any, props?: any) => boolean
        shouldNotBeNeverButAny: (state: any, props?: any) => any[]
        shouldNotBeNeverButAnyLoading: (state: any, props?: any) => boolean
        misc: (state: any, props?: any) => Record<string, any>
        miscLoading: (state: any, props?: any) => boolean
    }
    sharedListeners: {}
    values: {
        dashboard: Dashboard | null
        dashboardLoading: boolean
        shouldNotBeNeverButAny: any[]
        shouldNotBeNeverButAnyLoading: boolean
        misc: Record<string, any>
        miscLoading: boolean
    }
    _isKea: true
    _isKeaWithKey: false
}
