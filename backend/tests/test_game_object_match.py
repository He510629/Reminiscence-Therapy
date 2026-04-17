import unittest

from app.services.game import GAME_QUESTIONS
from app.schemas.game import GameQuestion


class ObjectMatchQuestionTests(unittest.TestCase):
    def test_object_match_questions_include_images_for_each_option(self):
        questions = [GameQuestion(**item) for item in GAME_QUESTIONS["object_match"]]

        self.assertGreater(len(questions), 0)
        for question in questions:
            self.assertTrue(question.option_media, f"{question.question_id} should expose option_media")
            self.assertEqual(set(question.options), set(question.option_media.keys()))
            self.assertIn(question.correct_answer, question.option_media)
            for option, image_url in question.option_media.items():
                self.assertTrue(
                    image_url.startswith("http"),
                    f"{option} should have a remote image URL",
                )


if __name__ == "__main__":
    unittest.main()
