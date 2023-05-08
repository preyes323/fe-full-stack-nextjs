"use client";
import { createNewProject } from "@/lib/api";
import { useState, useEffect } from "react";
import useSWR from 'swr';
import { useIm}
import Modal from "react-modal";
import Button from "../Button";
import Input from "../Input";

Modal.setAppElement("#modal");

const Projects = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [projects, setProjects] = useState(null);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {}, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createNewProject(name);
    closeModal();
  };

  return (
    <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
      {projects.map((project) => (
        <div className="w-1/3 p-3" key={project.id}>
          <Link href={`/project/${project.id}`}>
            <ProjectCard project={project} />
          </Link>
        </div>
      ))}
      <div className="w-1/3 p-3">
        <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
          <Button onClick={() => openModal()}>+ New Project</Button>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
            className="w-3/4 bg-white rounded-xl p-8"
          >
            <h1 className="text-3xl mb-6">New Project</h1>
            <form className="flex items-center" onSubmit={handleSubmit}>
              <Input
                placeholder="project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button type="submit">Create</Button>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Projects;
