var express = require("express");
var router = express.Router();
const query = require("../db.js");

/* GET boards. */
router.get("/:user_id", async function (req, res, next) {
  let user_id = req.params.user_id;
  if (null == user_id) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }
  const result = await query(
    `SELECT *
    FROM board b
    LEFT JOIN 
      user_board ub ON b.board_id = ub.board_id
    WHERE ub.user_id = $1
    ORDER BY created_time;`,
    [user_id]
  );
  res.send(result.rows);
});

/* GET board. */
router.get("/:user_id/:board_id", async function (req, res, next) {
  let user_id = req.params.user_id;
  let board_id = req.params.board_id;
  if (null == user_id || !board_id) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }
  const result = await query(
    `SELECT * 
    FROM board b
    LEFT JOIN 
      user_board ub ON b.board_id = ub.board_id
    WHERE b.user_id = $1
      and b.board_id = $2;`,
    [user_id, board_id]
  );
  if (null == result.rows.length) {
    return res
      .status(401)
      .send({ message: "You are not authorized to access this page." });
  }
  res.send(result.rows[0]);
});

/* Share board. */
router.post("/share", async function (req, res, next) {
  let user_id = req.body.user_id;
  let board_id = req.body.board_id;
  let email = req.body.email;
  if (null == user_id || null == board_id || null == email) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }
  const result = await query(
    `SELECT user_id from public."user" where email = $1`,
    [email]
  );
  if (result.rows.length)
    await query(
      `INSERT INTO user_board (user_id, board_id, role) VALUES ($1, $2, $3)`,
      [result.rows[0].user_id, board_id, "co-owner"]
    );
  res.send({ message: "Board shared." });
});

/* POST board. */
router.post("/", async function (req, res, next) {
  let user_id = req.body.user_id;
  let title = req.body.title;
  let description = req.body.description;
  let color = req.body.color;
  let properties = req.body.properties;
  if (
    null == user_id ||
    null == title ||
    null == description ||
    null == color ||
    null == properties
  ) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }

  const result = await query(
    `INSERT INTO board (user_id, title, description, color, created_time) VALUES ($1, $2, $3, $4, now()) RETURNING board_id`,
    [user_id, title, description, color]
  );

  let board_id = result.rows[0].board_id;

  if (properties.length) {
    let propertyValues = "";
    properties.forEach((property, i) => {
      propertyValues +=
        "(" +
        board_id +
        ",'" +
        property.type +
        "','" +
        property.title +
        "','" +
        property.value +
        "')" +
        (i == properties.length - 1 ? ";" : ",");
    });
    console.log(propertyValues);

    await query(
      `INSERT INTO property (board_id, type, title, value) VALUES ${propertyValues}`
    );
  }
  await query(
    `INSERT INTO user_board (user_id, board_id, role) VALUES ($1, $2, $3)`,
    [user_id, board_id, "owner"]
  );
  res.send({ ...result.rows[0], message: "Board successfully created." });
  // res.send({ board_id: 6, message: "Board successfully created" });
});

/* DELETE board. */
router.delete("/", async function (req, res, next) {
  let user_id = req.body.user_id;
  let board_id = req.body.board_id;
  if (null == user_id || null == board_id) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }
  await query(`DELETE FROM board WHERE board_id=$1`, [board_id]);
  res.send({ message: "Board successfully deleted" });
});

/* EDIT board. */
router.post("/edit", async function (req, res, next) {
  let user_id = req.body.user_id;
  let title = req.body.title;
  let color = req.body.color;
  let board_id = req.body.board_id;
  let description = req.body.description;
  let properties = req.body.properties;
  if (
    null == user_id ||
    null == title ||
    null == description ||
    null == color ||
    null == board_id
  ) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }
  const result = await query(
    `UPDATE board SET title=$1, color=$2, description=$3 WHERE board_id=$4 RETURNING board_id`,
    [title, color, description, board_id]
  );

  await query(`DELETE FROM public.property WHERE board_id=$1;`, [board_id]);
  if (properties.length) {
    let propertyValues = "";
    properties.forEach((property, i) => {
      propertyValues +=
        "(" +
        board_id +
        ",'" +
        property.type +
        "','" +
        property.title +
        "','" +
        property.value +
        "')" +
        (i == properties.length - 1 ? ";" : ",");
    });
    await query(
      `INSERT INTO property (board_id, type, title, value) VALUES ${propertyValues}`
    );
  }
  res.send({ message: "Board successfully updated" });
});

/* POST list. */
router.post("/list", async function (req, res, next) {
  let user_id = req.body.user_id;
  let title = req.body.title;
  let board_id = req.body.board_id;
  let color = req.body.color;
  if (null == user_id || null == title || null == color || null == board_id) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }
  const result = await query(
    `INSERT INTO list (title, color, board_id, created_time) VALUES ($1, $2, $3, now()) RETURNING list_id`,
    [title, color, board_id]
  );
  res.send({ message: "List successfully created." });
});

/* GET lists in a board. */
router.get("/lists/:user_id/:board_id", async function (req, res, next) {
  let board_id = req.params.board_id;
  let user_id = req.params.user_id;
  if (null == board_id) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }
  const result = await query(
    `SELECT
    l.list_id,
    l.title as list_title,
	l.color as list_color,
    b.board_id,
    b.title as board_title,
    b.description as board_description,
	b.color as board_color,
	b.image as board_image,
	JSON_ARRAYAGG(
		JSONB_BUILD_OBJECT(
			'title', c.title,
			'card_id', c.card_id,
			'color', c.color,
			'description', c.description,
			'image', c.image
		)
	) as cards
FROM
    board b
LEFT JOIN
    list l ON l.board_id = b.board_id
LEFT JOIN
    card c ON l.list_id = c.list_id
WHERE
    b.board_id = $1
GROUP BY
    l.list_id, l.title, l.color, b.board_id, b.title, b.description, b.color,
	b.image
ORDER BY l.created_time;`,

    [board_id]
  );
  const properties = await query(
    `SELECT p.* 
    FROM board b
    LEFT JOIN 
      user_board ub ON b.board_id = ub.board_id
    RIGHT JOIN 
      property p ON p.board_id = b.board_id
    WHERE ub.user_id = $1
      and b.board_id = $2;`,
    [user_id, board_id]
  );
  let card = result.rows[0];
  let board = {
    board_id: card.board_id,
    title: card.board_title,
    description: card.board_description,
    color: card.board_color,
    image: card.board_image,
    lists: [],
    properties: properties.rows,
  };

  result.rows.forEach((list) => {
    let cards = [];
    if (list.cards[0].card_id) {
      cards = list.cards;
    }
    if (list.list_id) {
      board.lists.push({
        list_id: list.list_id,
        title: list.list_title,
        color: list.list_color,
        cards: cards,
      });
    }
  });

  res.send(board);
});

/* EDIT list. */
router.post("/list/edit", async function (req, res, next) {
  let user_id = req.body.user_id;
  let title = req.body.title;
  let color = req.body.color;
  let list_id = req.body.list_id;
  if (null == user_id || null == title || null == color || null == list_id) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }
  const result = await query(
    `UPDATE list SET title=$1, color=$2 WHERE list_id=$3 RETURNING list_id`,
    [title, color, list_id]
  );
  res.send({ message: "List successfully updated." });
});

/* DELETE list. */
router.delete("/list", async function (req, res, next) {
  let user_id = req.body.user_id;
  let list_id = req.body.list_id;
  if (null == user_id || null == list_id) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }
  await query(`DELETE FROM list WHERE list_id=$1`, [list_id]);
  res.send({ message: "List successfully deleted" });
});

/* GET card. */
router.get("/card/:user_id/:card_id", async function (req, res, next) {
  let user_id = req.params.user_id;
  let card_id = req.params.card_id;
  if (null == user_id || null == card_id) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }
  const result = await query(
    `SELECT * FROM card WHERE card_id = $1 ORDER BY created_time;`,
    [card_id]
  );
  res.send(result.rows[0]);
});

/* POST card. */
router.post("/card", async function (req, res, next) {
  let user_id = req.body.user_id;
  let title = req.body.title;
  let description = req.body.description;
  let list_id = req.body.list_id;
  let color = req.body.color;
  if (
    null == user_id ||
    null == title ||
    null == description ||
    null == list_id ||
    null == color
  ) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }
  const result = await query(
    `INSERT INTO card (title, description, color, list_id, created_time) VALUES ($1, $2, $3, $4, now()) RETURNING card_id`,
    [title, description, color, list_id]
  );
  res.send({ message: "Card successfully created." });
});

/* EDIT card. */
router.post("/card/edit", async function (req, res, next) {
  let user_id = req.body.user_id;
  let title = req.body.title;
  let description = req.body.description;
  let card_id = req.body.card_id;
  if (
    null == user_id ||
    null == title ||
    null == description ||
    null == card_id
  ) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }
  const result = await query(
    `UPDATE card SET title=$1, description=$2 WHERE card_id=$3 RETURNING card_id`,
    [title, description, card_id]
  );
  res.send({ message: "Card successfully updated." });
});

/* DELETE card. */
router.delete("/card", async function (req, res, next) {
  let user_id = req.body.user_id;
  let card_id = req.body.card_id;
  if (null == user_id || null == card_id) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }
  await query(`DELETE FROM card WHERE card_id=$1`, [card_id]);
  res.send({ message: "Card successfully deleted" });
});

/* GET properties. */
router.get("properties/:user_id/:board_id", async function (req, res, next) {
  let user_id = req.params.user_id;
  let board_id = req.params.board_id;
  if (!user_id || !board_id) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }
  const result = await query(
    `SELECT * 
    FROM board b
    LEFT JOIN 
      user_board ub ON b.board_id = ub.board_id
    LEFT JOIN 
      property p ON p.board_id = b.board_id
    WHERE ub.user_id = $1
      and b.board_id = $2;`,
    [user_id, board_id]
  );
  res.send(result.rows);
});

module.exports = router;
