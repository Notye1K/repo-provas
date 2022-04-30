import axios from 'axios'
import { Form } from '../components/CreateTest'

import api from './apiUrl'
import config from './headerConfig'

export function getTerms() {
    const promise = axios.get(api + `/tests/terms`, config())
    return promise
}

export function getDisciplines(termId: number) {
    const promise = axios.get(
        api + `/tests/terms/${termId}/disciplines`,
        config()
    )
    return promise
}

export function getTests(disciId: number) {
    const promise = axios.get(api + `/tests/disciplines/${disciId}`, config())
    return promise
}

export function getTeachers() {
    const promise = axios.get(api + `/tests/teachers`, config())
    return promise
}

export function incViews(testId: number) {
    axios.patch(api + `/tests/${testId}`, {}, config())
}

export function getCategories() {
    const promise = axios.get(api + `/tests/categories`, config())
    return promise
}

export function getAllDisciplines() {
    const promise = axios.get(api + `/tests/disciplines`, config())
    return promise
}

export function getTeachersByDiscipline(disciId: number) {
    const promise = axios.get(api + `/tests/teachers/${disciId}`, config())
    return promise
}

export function postTest(form: Form) {
    const promise = axios.post(api + `/tests`, form, config())
    return promise
}
