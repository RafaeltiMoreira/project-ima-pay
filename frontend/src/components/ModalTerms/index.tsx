import styles from "./styles.module.css";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

export function ModalTerms({ isOpen, closeModal }: Props) {
  if (isOpen) {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.content}>
            <button onClick={closeModal} className={styles.btn}>X</button>
            <h3>Termos de uso e Serviços do Imã Pay</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ex sit reiciendis suscipit, repudiandae in sunt nulla ratione vitae corrupti ea assumenda amet tempore animi. Obcaecati delectus voluptatem eveniet? Aliquam?
            Itaque, maiores molestiae! Magnam sapiente blanditiis, aliquam maxime tenetur voluptate, illum iure aliquid, libero aut molestiae placeat fugiat. Voluptates, dignissimos deserunt culpa unde aperiam animi est impedit voluptatum quod quas!
            Obcaecati quos ipsam voluptas commodi, magni earum soluta non nesciunt sunt molestias eos perferendis illo saepe sequi pariatur modi numquam veniam quasi ipsum fugit eaque consequatur? Voluptatibus tempora esse dignissimos.
            Odio repellat dolores a nobis deleniti quisquam, ab iure libero excepturi officia beatae ad, nostrum sunt aspernatur corporis, ipsum nulla facilis quae molestias vero qui itaque. Cupiditate molestias dolorum ut.
            Nesciunt, cupiditate quo. Asperiores, deleniti. Temporibus, quam asperiores! Inventore temporibus quos ducimus quis soluta, aspernatur, veritatis sed ipsam asperiores non doloribus ea corrupti dicta voluptates doloremque natus esse, dolorem tempore?
            Voluptatem vero repudiandae amet tenetur suscipit, quae voluptatibus repellat similique et dolorum accusantium consequatur! In, animi reiciendis minus rerum ipsam omnis sapiente natus temporibus facere id, possimus voluptate reprehenderit facilis.</p>
          </div>
        </div>
      </>
    );
  }

  return null;
}
