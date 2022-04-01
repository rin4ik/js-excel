import { storage } from '@/core/utils'
import { defaultStyles } from '../constants'

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    currentStyle: defaultStyles,
    currentText: '',
}
export const initialState = storage('excel-state')
    ? storage('excel-state')
    : defaultState
