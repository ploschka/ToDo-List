<?php

namespace App\Controller;

use App\Repository\ToDoRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ToDoUpdateController extends AbstractController
{
    #[Route('/del', name: 'todo_delete', methods: ['DELETE'])]
    public function del(Request $request, ToDoRepository $toDoRepository): JsonResponse
    {
        $id = $request->getContent();
        $todo = $toDoRepository->findOneBy(['id' => $id]);
        $toDoRepository->remove($todo, true);
        return $this->json(['done' => true]);
    }

    #[Route('/upd', name: 'todo_update', methods: ['POST'])]
    public function upd(Request $request, ToDoRepository $toDoRepository): JsonResponse
    {
        $out = \fopen('php://stdout', 'w');
        \fwrite($out, $request->getContent());
        \fwrite($out, "\n");
        \fclose($out);
        $req = \json_decode($request->getContent(), true);
        $todo = $toDoRepository->find($req['i']);
        $todo->setText($req['text']);
        $toDoRepository->save($todo, true);
        return $this->json(['done' => true]);
    }
}
