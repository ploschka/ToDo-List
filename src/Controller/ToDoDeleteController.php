<?php

namespace App\Controller;

use App\Repository\ToDoRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ToDoDeleteController extends AbstractController
{
    #[Route('/del', name: 'todo_delete')]
    public function index(Request $request, ToDoRepository $toDoRepository): JsonResponse
    {
        $id = $request->getContent();
        $out = \fopen('php://stdout', 'w');
        \fwrite($out, $id);
        \fclose($out);
        $todo = $toDoRepository->findOneBy(['id' => $id]);
        $toDoRepository->remove($todo, true);
        return $this->json(['done' => true]);
    }
}
