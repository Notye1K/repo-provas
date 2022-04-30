import {
    Alert,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Snackbar,
    TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import {
    getAllDisciplines,
    getCategories,
    getTeachersByDiscipline,
    postTest,
} from '../../services/testsService'

export interface Form {
    title: string
    pdf: string
    category: string
    discipline: string
    instructor: string
}

interface Category {
    id: number
    name: string
}

type Teacher = Category

interface Discipline {
    id: number
    name: string
    termId: number
}

export default function CreateTest() {
    const emptyForm: Form = {
        title: '',
        pdf: '',
        category: '',
        discipline: '',
        instructor: '',
    }

    const [form, setForm] = useState<Form>({ ...emptyForm })
    const [categories, setCategories] = useState<Category[] | never[]>([])
    const [disciplines, setDisciplines] = useState<Discipline[] | never[]>([])
    const [teachers, setTeachers] = useState<Teacher[] | never[]>([])

    useEffect(() => {
        getCategories()
            .then((response) => {
                setCategories(response.data)
            })
            .catch((error) => {
                alert('Alguma coisa falhou, tente novamente mais tarde!')
                console.log(error.response)
            })

        getAllDisciplines()
            .then((response) => {
                setDisciplines(response.data)
            })
            .catch((error) => {
                alert('Alguma coisa falhou, tente novamente mais tarde!')
                console.log(error.response)
            })
    }, [])

    const handleChange = (event: SelectChangeEvent) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    function handleClick(disciId: number) {
        getTeachersByDiscipline(disciId)
            .then((response) => {
                setTeachers(response.data)
            })
            .catch((error) => {
                alert('Alguma coisa falhou, tente novamente mais tarde!')
                console.log(error.response)
            })
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        postTest(form)
            .then((response) => {
                setOpen(true)
                setForm({ ...emptyForm })
            })
            .catch((error) => {
                alert('Alguma coisa falhou, tente novamente mais tarde!')
                console.log(error.response)
            })
    }

    const [open, setOpen] = useState(false)

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }
    return (
        <>
            <Container component="form" onSubmit={handleSubmit}>
                <TextField
                    id="outlined-basic"
                    label="Titulo da prova"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    name="title"
                    value={form.title}
                    onChange={handleOnChange}
                />
                <TextField
                    id="outlined-basic2"
                    label="PDF da prova"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    name="pdf"
                    value={form.pdf}
                    onChange={handleOnChange}
                    type="url"
                />
                <FormControl fullWidth margin="normal" required>
                    <InputLabel id="demo-simple-select-label">
                        Categoria
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={form.category}
                        label="Categoria"
                        onChange={handleChange}
                        name="category"
                    >
                        {categories.map((category) => (
                            <MenuItem value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" required>
                    <InputLabel id="demo-simple-select-label2">
                        Disciplina
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label2"
                        id="demo-simple-select2"
                        value={form.discipline}
                        label="Disciplina"
                        onChange={handleChange}
                        name="discipline"
                    >
                        {disciplines.map((discipline) => (
                            <MenuItem
                                value={discipline.id}
                                onClick={() => handleClick(discipline.id)}
                            >
                                {discipline.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl
                    fullWidth
                    margin="normal"
                    required
                    disabled={form.discipline === '' ? true : false}
                >
                    <InputLabel id="demo-simple-select-label3">
                        Pessoa Instrutora
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label3"
                        id="demo-simple-select3"
                        value={form.instructor}
                        label="Pessoa Instrutora"
                        onChange={handleChange}
                        name="instructor"
                    >
                        {teachers.map((teacher) => (
                            <MenuItem value={teacher.id}>
                                {teacher.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                    type="submit"
                    variant="contained"
                >
                    Enviar
                </Button>
            </Container>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Criado com sucesso
                </Alert>
            </Snackbar>
        </>
    )
}
