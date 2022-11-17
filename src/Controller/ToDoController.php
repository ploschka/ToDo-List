<?php

namespace App\Controller;

use App\Entity\ToDo;
use App\Form\ToDoFormType;
use App\Repository\ToDoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ToDoController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    #[Route('/', name: 'homepage')]
    public function index(Request $request, ToDoRepository $toDoRepository): Response
    {
        $todo = new ToDo();
        $addForm = $this->createForm(ToDoFormType::class, $todo);
        $addForm->handleRequest($request);
        if ($addForm->isSubmitted() && $addForm->isValid())
        {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
            return $this->redirectToRoute('homepage');
        }

        return $this->render('to_do/index.html.twig', [
            'todo_form' => $addForm->createView(),
            'todos' => $toDoRepository->findAll(),
        ]);
    }
}
