import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material'
import { useState } from 'react'

interface Form {
    title: string
    pdf: string
    category: string
    discipline: string
    instructor: string
}

export default function CreateTest() {
    const [form, setForm] = useState<Form>({
        title: '',
        pdf: '',
        category: '',
        discipline: '',
        instructor: '',
    })

    const handleChange = (event: SelectChangeEvent) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log(form)
    }
    return (
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
            />
            <FormControl fullWidth margin="normal" required>
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={form.category}
                    label="Categoria"
                    onChange={handleChange}
                    name="category"
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
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
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
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
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
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
    )
}
