import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Container,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { getTerms, getTests } from '../../services/testsService'
import Div from './style'

interface Term {
    id: number
    number: number
    disciplines: Discipline[]
}

interface Discipline {
    id: number
    name: string
    termId: number
    teacherDiscipline: TeacherDiscipline[]
}

interface Category {
    id: number
    name: string
}

interface Test {
    id: number
    name: string
    pdfUrl: string
    categoryId: number
    teacherDisciplineId: number
    createdAt: string
    category: Category
    teacherName?: string
}

interface Teacher {
    id: number
    name: string
}

interface TeacherDiscipline {
    id: number
    teacherId: number
    disciplineId: number
    test: Test[]
    teacher: Teacher
}

interface GetCategory {
    categoryName: string
    tests: Test[]
}

export default function Tests() {
    const navigate = useNavigate()

    const [button, setButton] = useState(1)
    const [terms, setTerms] = useState<Term[] | never[]>([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) navigate('/')

        getByDisciplines()
    }, [])

    function handleClickButtons(number: number) {
        if (number === button) return
        setButton(number)
        if (number === 1) {
            getByDisciplines()
        }
    }

    function getByDisciplines() {
        getTerms()
            .then((response) => {
                setTerms(response.data)
            })
            .catch((error) => {
                console.log(error.response?.data)
            })
    }

    return (
        <>
            <Header text="Disciplina" />
            <Container maxWidth="md">
                <Box display="flex" justifyContent="space-between" mt={4}>
                    <Button
                        size="large"
                        variant={button === 1 ? 'contained' : 'outlined'}
                        onClick={() => handleClickButtons(1)}
                    >
                        DISCIPLINA
                    </Button>
                    <Button
                        size="large"
                        variant={button === 2 ? 'contained' : 'outlined'}
                        onClick={() => handleClickButtons(2)}
                    >
                        PESSOA INSTRUTORA
                    </Button>
                    <Button
                        size="large"
                        variant={button === 3 ? 'contained' : 'outlined'}
                        onClick={() => handleClickButtons(3)}
                    >
                        ADICIONAR
                    </Button>
                </Box>
                <Box mt={4}>
                    <Div>
                        {(terms as Term[]).map((term: Term) => (
                            <SimpleAccordion term={term}>
                                {term.disciplines.length > 0 ? (
                                    term.disciplines.map((discipline) => (
                                        <InnerAccordion
                                            discipline={discipline}
                                        />
                                    ))
                                ) : (
                                    <Typography>
                                        Não foi adicionado nenhuma disciplina
                                    </Typography>
                                )}
                            </SimpleAccordion>
                        ))}
                    </Div>
                </Box>
            </Container>
        </>
    )
}

function SimpleAccordion({
    children,
    term,
}: {
    children: JSX.Element[] | JSX.Element
    term: Term
}) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className="term">{`${term.number}º Periodo`}</Typography>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    )
}

function InnerAccordion({ discipline }: { discipline: Discipline }) {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getTests(discipline.id)
            .then((response) => {
                setCategories(response.data)
            })
            .catch((error) => {
                console.log(error.response)
            })
    }, [])

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className="disci">{discipline.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {categories.length > 0 ? (
                    (categories as GetCategory[]).map(
                        (category: GetCategory) => (
                            <>
                                <Typography className="category">
                                    {category.categoryName}
                                </Typography>
                                {category.tests.map((test) => (
                                    <Typography className="test">
                                        {test.createdAt
                                            .slice(0, 7)
                                            .replace('-', '.')}
                                        {' - '}
                                        {test.name} ({test.teacherName})
                                    </Typography>
                                ))}
                            </>
                        )
                    )
                ) : (
                    <Typography>
                        Não foi adicionado nenhuma categoria
                    </Typography>
                )}
            </AccordionDetails>
        </Accordion>
    )
}
