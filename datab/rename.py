import os
import sys


def rename_files(folder_path):
    # Verifica se o caminho é um diretório válido
    if not os.path.isdir(folder_path):
        print("O caminho fornecido não é um diretório válido.")
        return

    # Lista todos os arquivos no diretório
    files = os.listdir(folder_path)

    # Filtra apenas os arquivos que começam com "STK"
    stk_files = [f for f in files if f.startswith("STK")]

    # Renomeia os arquivos para números sequenciais
    for index, filename in enumerate(stk_files, start=1):
        old_path = os.path.join(folder_path, filename)
        new_filename = f"{index}.webp"  # Novo nome de arquivo com extensão .webp
        new_path = os.path.join(folder_path, new_filename)
        os.rename(old_path, new_path)
        print(f"Arquivo renomeado: {filename} -> {new_filename}")


if __name__ == "__main__":
    # Verifica se o caminho para a pasta foi fornecido como argumento de linha de comando
    if len(sys.argv) != 2:
        print("Uso: python rename_files.py <caminho_para_pasta>")
        sys.exit(1)

    folder_path = sys.argv[1]
    rename_files(folder_path)
