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
import { getTeachers, getTerms, getTests } from '../../services/testsService'
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

interface GetTeacher {
    id: number
    name: string
    categories: TeacherCategory[]
}

interface TeacherCategory {
    name: string
    tests: TeacherTest[]
}

interface TeacherTest {
    id: number
    name: string
    pdfUrl: string
    categoryId: number
    teacherDisciplineId: number
    createdAt: string
    teacherDiscipline: TeacherDiscipline & { discipline: Discipline }
}

export default function Tests() {
    const navigate = useNavigate()

    const [button, setButton] = useState(1)
    const [terms, setTerms] = useState<Term[] | never[]>([])
    const [teachers, setTeachers] = useState<GetTeacher[] | never[]>([])
    const [textSearchBar, setTextSearchBar] = useState('Disciplina')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) navigate('/')

        setLoading(true)
        getByDisciplines()
    }, [])

    function handleClickButtons(number: number) {
        if (number === button) return
        setButton(number)
        if (number === 1) {
            setTextSearchBar('Disciplina')
            getByDisciplines()
        } else if (number === 2) {
            setTextSearchBar('Pessoa Instrutora')
            setLoading(true)
            getTeachers()
                .then((response) => {
                    setTeachers(response.data)
                })
                .catch((error) => {
                    console.log(error.response?.data)
                })
                .finally(() => setLoading(false))
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
            .finally(() => setLoading(false))
    }

    function search(value: string, type: string) {
        if (type === 'Pessoa Instrutora') setExpandedTeacher(value)
        else setExpandedDisciplines(value)
    }

    const [expandedTeacher, setExpandedTeacher] = useState<string | false>(
        false
    )
    const [expandedDisciplines, setExpandedDisciplines] = useState<
        string | false
    >(false)
    const handleChangeTeacher =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpandedTeacher(isExpanded ? panel : false)
        }

    return (
        <>
            <Header text={textSearchBar} search={search} />
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
                    {button === 1 ? (
                        <Div>
                            {terms.length > 0 ? (
                                (terms as Term[]).map((term: Term) => (
                                    <SimpleAccordion
                                        term={term}
                                        key={term.id}
                                        expandedDisciplines={
                                            expandedDisciplines
                                        }
                                    ></SimpleAccordion>
                                ))
                            ) : (
                                <Typography className="empty">
                                    {loading
                                        ? 'Carregando ...'
                                        : 'Nenhum periodo foi adicionado'}
                                </Typography>
                            )}
                        </Div>
                    ) : button === 2 ? (
                        <Div>
                            {teachers.length > 0 ? (
                                teachers.map((teacher) => (
                                    <Accordion
                                        expanded={
                                            expandedTeacher === teacher.name
                                        }
                                        onChange={handleChangeTeacher(
                                            teacher.name
                                        )}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className="term">
                                                {teacher.name}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {teacher.categories?.length > 0 ? (
                                                teacher.categories.map(
                                                    (category) => (
                                                        <>
                                                            <Typography className="category">
                                                                {category.name}
                                                            </Typography>
                                                            {category.tests.map(
                                                                (test) => (
                                                                    <a
                                                                        href={
                                                                            test.pdfUrl
                                                                        }
                                                                        key={
                                                                            test.id
                                                                        }
                                                                    >
                                                                        <Typography className="test">
                                                                            {test.createdAt
                                                                                .slice(
                                                                                    0,
                                                                                    7
                                                                                )
                                                                                .replace(
                                                                                    '-',
                                                                                    '.'
                                                                                )}
                                                                            {
                                                                                ' - '
                                                                            }
                                                                            {
                                                                                test.name
                                                                            }{' '}
                                                                            (
                                                                            {
                                                                                test
                                                                                    .teacherDiscipline
                                                                                    .discipline
                                                                                    .name
                                                                            }
                                                                            )
                                                                        </Typography>
                                                                    </a>
                                                                )
                                                            )}
                                                        </>
                                                    )
                                                )
                                            ) : (
                                                <Typography>
                                                    Não foi adicionado nenhuma
                                                    categoria
                                                </Typography>
                                            )}
                                        </AccordionDetails>
                                    </Accordion>
                                ))
                            ) : (
                                <Typography className="empty">
                                    {loading
                                        ? 'Carregando ...'
                                        : 'Nenhum professor foi adicionado'}
                                </Typography>
                            )}
                        </Div>
                    ) : (
                        'criar'
                    )}
                </Box>
            </Container>
        </>
    )
}

function SimpleAccordion({
    term,
    expandedDisciplines,
}: {
    term: Term
    expandedDisciplines: string | false
}) {
    const [expandedTerm, setExpandedTerm] = useState<number | false>(false)

    const handleChange =
        (panel: number) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpandedTerm(isExpanded ? panel : false)
        }

    return (
        <Accordion
            expanded={
                expandedTerm === term.number ||
                !!term.disciplines.find(
                    (v) => v.name === expandedDisciplines && expandedTerm === -1
                )
            }
            onChange={handleChange(term.number)}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className="term">{`${term.number}º Periodo`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {term.disciplines.length > 0 ? (
                    term.disciplines.map((discipline) => (
                        <InnerAccordion
                            discipline={discipline}
                            key={discipline.id}
                            expandedDisciplines={expandedDisciplines}
                            setExpandedTerm={setExpandedTerm}
                            term={term.number}
                        />
                    ))
                ) : (
                    <Typography>
                        Não foi adicionado nenhuma disciplina
                    </Typography>
                )}
            </AccordionDetails>
        </Accordion>
    )
}

function InnerAccordion({
    discipline,
    expandedDisciplines,
    setExpandedTerm,
    term,
}: {
    discipline: Discipline
    expandedDisciplines: string | false
    setExpandedTerm: React.Dispatch<React.SetStateAction<number | false>>
    term: number
}) {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const [expanded, setExpanded] = useState<string | false>(
        expandedDisciplines
    )

    useEffect(() => {
        setExpanded(expandedDisciplines)
        if (expandedDisciplines === discipline.name) {
            setExpandedTerm(term)
        } else setExpandedTerm(-1)
    }, [expandedDisciplines])

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false)
        }

    useEffect(() => {
        setLoading(true)
        getTests(discipline.id)
            .then((response) => {
                setCategories(response.data)
            })
            .catch((error) => {
                console.log(error.response)
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <Accordion
            expanded={expanded === discipline.name}
            onChange={handleChange(discipline.name)}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id={`panel1a-header`}
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
                                    <a href={test.pdfUrl} key={test.id}>
                                        <Typography
                                            className="test"
                                            key={test.name}
                                        >
                                            {test.createdAt
                                                .slice(0, 7)
                                                .replace('-', '.')}
                                            {' - '}
                                            {test.name} ({test.teacherName})
                                        </Typography>
                                    </a>
                                ))}
                            </>
                        )
                    )
                ) : (
                    <Typography>
                        {loading
                            ? 'Carregando ...'
                            : 'Não foi adicionado nenhuma categoria'}
                    </Typography>
                )}
            </AccordionDetails>
        </Accordion>
    )
}
